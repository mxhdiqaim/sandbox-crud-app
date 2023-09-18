import { ChangeEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updateUser, useAuth } from "../../context/users/UserState";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { UserForm } from "../../components";
import { useSnackbar } from "notistack";

const Account = () => {
  const [authState, authDispatch] = useAuth();
  const { user, isAuthenticated } = authState;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [current, setCurrent] = useState();

  const [image, setImage] = useState<string | ArrayBuffer | null>();

  const setFileToBase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileToBase(file);
  };

  const handleUpload = async () => {
    if (user) {
      updateUser(authDispatch, { image: image, _id: user._id });
    }

    enqueueSnackbar("Uploading Image", { variant: "success" });
  };

  const handleCurrent = (e: any) => {
    if (user) {
      setCurrent(user);
    }
  };

  if (!user && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth={"md"}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <h1>Account</h1>
      </Box>
      <Box sx={{ mt: 2 }} className="card bg-light">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ":hover": { cursor: "pointer" },
          }}
        >
          <Avatar
            src={user?.avatar?.avatar_url}
            sx={{
              borderRadius: "20%",
              width: "100px",
              height: "100px",
              mr: 2,
            }}
            alt={user.name}
          />
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              component={"h1"}
              className="text-primary text-left"
              sx={{
                textTransform: "capitalize",
                fontSize: "1.25rem",
                color: "#47012b",
              }}
            >
              {user.name}
            </Typography>
            <ul className="list">
              {user.email && (
                <li>
                  <i className="fas fa-envelope-open" /> {user.email}
                </li>
              )}
            </ul>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {user.description && (
            <Typography component={"p"} sx={{ textAlign: "justify", p: 1 }}>
              {user.description}
            </Typography>
          )}
          <Input
            type="file"
            name="avatar"
            id="avatar"
            inputProps={{
              accept: "image/*",
              onChange: handleImage,
            }}
          />
          <Button
            onClick={handleUpload}
            sx={{ alignSelf: "center", width: "100%", mb: 2 }}
            variant="contained"
            component="label"
            disabled={!image}
          >
            Upload Image
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ alignSelf: "center", width: "100%" }}
            onClick={handleCurrent}
          >
            Edit
          </Button>
        </Box>
      </Box>
      {current && <UserForm current={current} setCurrent={setCurrent} />}
    </Container>
  );
};

export default Account;
