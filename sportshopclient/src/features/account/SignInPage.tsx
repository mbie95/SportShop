import { LoadingButton } from "@mui/lab";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignInPage() {
    return (
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" /*onSubmit={handleSubmit(submitForm)}*/ noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                // {...register('username', {required:'Username is required'})}
                // error={!!errors.username}
                // helperText={errors?.username?.message as string}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                // {...register('password', {required:'Password is required'})}
                // error={!!errors.password}
                // helperText={errors?.password?.message as string}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton //loading={isSubmitting}
                //disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
              <Grid container sx={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Grid sx={{display:'flex', size: 'xs'}}>
                  <Link to="#">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid sx={{display:'flex'}}>
                  <Link to="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>    
    );
}
