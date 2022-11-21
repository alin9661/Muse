import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { fontFamily, fontSize } from '@mui/system';

export default function SplashScreen() {
    const title = {
        fontFamily: 'cursive',
        fontSize: 120,
        padding: 2
    }
    const text = {
        fontFamily: 'cursive',
        fontSize: 24
    }

    return (
        <Box id="splash-screen">
            <Typography sx={title}>Playlister</Typography>
            <Typography sx={text}>Playlister is an application for creating and playing Youtube music videos.</Typography>
            <Typography sx={text}>which they can share with other users on the platform. This site allows </Typography>
            <Typography sx={text}> users to create, edit, and play songs from playlists</Typography>
            <Typography sx={{fontFamily: 'cursive'}}>by Aaron Lin</Typography>
            <Grid container justifyContent="center" spacing={4}>
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