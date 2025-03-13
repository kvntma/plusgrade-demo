import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Copyright } from "./components/footer/Copyright";

import TaxCalculator from "./layouts/TaxCalculator";
import SnackbarProvider from "./layouts/SnackbarProvider";

export default function App() {
  return (
    <SnackbarProvider>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
            mb: 2,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            py: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            Marginal Tax Calculator
          </Typography>
        </Box>
        <Box component="main" sx={{ flex: 1, mb: 2 }}>
          <TaxCalculator />
        </Box>
        <Box component="footer" sx={{ mt: "auto" }}>
          <Copyright />
        </Box>
      </Container>
    </SnackbarProvider>
  );
}
