import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
// import { AppRouteType } from "./routes/app";
import { theme } from "./themes/theme";
import UserState from "./context/users/UserState";
import AlertState from "./context/alert/AlertState";
import "./App.css";
import { About, Account, Home, Login, Profile, Register } from "./pages";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar/Navbat";

function App() {
  return (
    <UserState>
      <AlertState>
        <ThemeProvider theme={theme}>
          <Router>
            <CssBaseline />
            <Navbar />
            <Container maxWidth="lg">
              <Routes>
                <Route path="/" element={<PrivateRoute component={Home} />} />
                <Route path="about" element={<About />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </Container>
          </Router>
        </ThemeProvider>
      </AlertState>
    </UserState>
  );
}

export default App;
