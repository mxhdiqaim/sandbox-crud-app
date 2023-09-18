import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Box>
      <Typography component={"h1"}>About This App</Typography>
      <p className="my-1">
        This is a full stack React app similar to contact app
      </p>
      <Typography className="bg-dark p" sx={{ color: "white" }}>
        <strong>Version: </strong> 1.0.0
      </Typography>
      <Link to="/">Back to Home</Link>
    </Box>
  );
};

export default About;
