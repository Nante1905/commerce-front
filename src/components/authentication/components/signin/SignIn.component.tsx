import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { UserCredentials } from "../../types/user.type";
import "./Signin.component.scss";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    const data = new FormData(event.currentTarget);
    const authData: UserCredentials = {
      email: data.get("username")!.toString(),
      password: data.get("password")!.toString(),
    };

    login(authData)
      .then((res) => {
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        navigate("/demandes");
      })
      .catch((err) => {
        setErrMessage(err.response.data.message);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="login_main-container">
        <div className="login_left-container">
          <img src="/img/login-banner.jpg" alt="" />
        </div>
        <div className="login_right-container">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Se connecter
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Nom d'utilisateur"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se connecter
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Pas encore de compte"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
      <Snackbar open={errMessage !== ""} onClose={() => setErrMessage("")}>
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setErrMessage("")}
        >
          {errMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
