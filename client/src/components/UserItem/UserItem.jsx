import PropTypes from "prop-types";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  const { _id, name, email, avatar } = user;

  return (
    <Link to={`/profile/${_id}`}>
      <Box
        className="card bg-light"
        sx={{
          display: "flex",
          alignItems: "center",
          ":hover": { cursor: "pointer" },
        }}
      >
        <label htmlFor={"inputId"}>
          <Avatar
            src={avatar && avatar.avatar_url}
            sx={{ borderRadius: "50%", width: "60px", height: "60px", mr: 2 }}
            alt={name}
          />
        </label>
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
            {name}
          </Typography>
          <ul className="list">
            {email && (
              <li>
                <i className="fas fa-envelope-open" /> {email}
              </li>
            )}
          </ul>
        </Grid>
      </Box>
    </Link>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
