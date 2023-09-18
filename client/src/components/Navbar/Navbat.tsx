import { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth, logout } from "../../context/users/UserState";
import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

const Navbar = ({ title, icon }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;

  const onLogout = () => {
    logout(authDispatch);

    enqueueSnackbar("Login Out...", { variant: "success" });
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li>
        <Link onClick={onLogout} to="/login">
          <Typography component={"span"} sx={{ color: "#fff" }}>
            Logout
          </Typography>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="bg-primary">
      <Container maxWidth={"lg"}>
        <div className="navbar">
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              <i className={icon} /> {title}
            </Link>
            <Typography component={"p"} sx={{ ml: 1 }}>
              <Link to="about">About</Link>
            </Typography>
          </h1>
          <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
      </Container>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "CRUD App",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
