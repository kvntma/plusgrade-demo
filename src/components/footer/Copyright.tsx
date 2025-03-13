import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Copyright = () => {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://myles-ma.vercel.app/">
        Myles Ma
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};
