import { useContext } from 'react'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    const title = {
        fontFamily: 'Brush Script MT',
        fontSize: 120,
        padding: 2
    }
    const text = {
        fontFamily: 'cursive',
        fontSize: 24,
        flexWrap: 'wrap',
        padding: 2
    }

    function handleGuest() {
        auth.createGuest();
    }

    return (
        <Box id="splash-screen">
            <Typography sx={title}>Playlister</Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={6}>
                    <Typography sx={text}>
                        Playlister is an application for creating and playing Youtube music videos. 
                        which they can share with other users on the platform. This site allows users 
                        to create, edit, and play songs from playlists
                    </Typography>
                </Grid>
            </Grid>
            <Typography sx={{fontFamily: 'cursive'}}>by Aaron Lin</Typography>
            <Grid container justifyContent="center" spacing={4}>
                <Grid item>
                    <Button size="large" variant="contained"><Link to='/login/'>Login</Link></Button>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained"><Link to='/register/'>Create Account</Link></Button>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained"><Link onClick={handleGuest}>Continue as Guest</Link></Button>
                </Grid>
            </Grid>
        </Box>
    );
}