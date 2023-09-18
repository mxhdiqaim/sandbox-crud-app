import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import { upload } from "../middleware/upload.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

// @route     GET api/users
// @desc      Get all users
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.find().sort({ date: -1 });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  "/",
  upload.single("avatar"),
  check("name", "Please add name").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      if (req.file) {
        user.avatar = req.file.path;
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/users/:id
// @desc      Update user
// @access    Private
router.put("/:id", auth, upload.single("avatar"), async (req, res) => {
  const { name, email, description, image } = req.body;

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (description) userFields.description = description;
  if (image) {
    const avatar = await cloudinary.v2.uploader.upload(image, {
      folder: "images",
    });
    userFields.avatar = {
      public_id: avatar.public_id,
      avatar_url: avatar.url,
    };
  }

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Make sure only users can update their details
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
