import { useEffect } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useAuth, getUsers } from "../../context/users/UserState";
import { Navigate, useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [authState, authDispatch] = useAuth();
  const { users } = authState;
  const user = users.find((user: any) => user._id === params.id);

  const { name, email, avatar, description } = user;

  useEffect(() => {
    getUsers(authDispatch);
  }, [authDispatch]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth={"md"} sx={{ mt: 2 }}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Profile</h1>
        <Avatar
          src={avatar?.avatar_url}
          alt={name}
          sx={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
        <Typography
          component={"p"}
          sx={{ fontSize: "1.25rem", textTransform: "capitalize" }}
        >
          <b>Name:</b> {name}
        </Typography>
        <Typography component={"p"} sx={{ fontSize: "1.25rem" }}>
          <b>Email:</b> {email}
        </Typography>
        {description && (
          <Typography component={"p"} sx={{ fontSize: "1.25rem" }}>
            <b>Description:</b> {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
