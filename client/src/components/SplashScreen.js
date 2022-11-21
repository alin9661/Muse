import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

export default function SplashScreen() {
    return (
        <Box id="splash-screen">
            Playlister
            <Grid container justifyContent="center" spacing={4} padding={10}>
                <Grid item>
                    <Button size="large" variant="contained"><Link to='/login/'>Login</Link></Button>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained"><Link to='/register/'>Create Account</Link></Button>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained"><Link>Continue as Guest</Link></Button>
                </Grid>
            </Grid>
        </Box>
    );
}