import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Container sx={{ paddingTop: "64px" }}>
        <Outlet/>
      </Container>
    </>
  )
}

export default App
