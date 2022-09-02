import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function Login() {

    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const setRememberMe_ = () => {
        rememberMe ? setRememberMe(false) : setRememberMe(true)
    }

    const handleSubmit = (event) => {
        setError(false)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let data_ = ({
            email: data.get('email'),
            password: data.get('password'),
        });
        console.log(data_)
        if (!validate(data_)) return
        console.log("todo ok")
    };

    const validate = (data) => {
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (!emailRegex.test(data.email)) {
          setError(true)
          setErrorMessage("Email iválido")
          return false
        } 
        if (data.password.length < 8) {
            setError(true)
            setErrorMessage("Contraseña inválida")
            return false
        }
        return true
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Usuario"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {error ?
                            <Alert severity="warning">{errorMessage}</Alert>
                            : null}

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recuerdame"
                            onClick={setRememberMe_}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar sesion
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"No tiene una cuenta? Registrese"}
                                </Link>
                            </Grid>
                        </Grid>
                        {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
                        {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
                        {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}