import { Box, Container } from "@mui/material";
import { Users } from "../../components";

const Home = () => {
  return (
    <Container maxWidth={"md"} sx={{ mt: 2 }}>
      <Box
        sx={{
          maxWidth: "860px",
          margin: "auto",
        }}
      >
        <Users />
      </Box>
    </Container>
  );
};

export default Home;
