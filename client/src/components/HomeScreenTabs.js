import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import YouTube from 'react-youtube';
import Typography from '@mui/material/Typography';
import { minHeight } from '@mui/system';

export default function HomeScreenTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    function TabPanel (props) {
        const {children, value, index} = props;
        
        return (
            <div>
                { value === index && children }
            </div>
        )
    }

    function YoutubePlayer() {
        const boxFX = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            alignContent: 'flex-end',
            maxHeight: '100px'
        }

        const textFX = {
            fontWeight: 'bold',
            p: '1'
        }

        function handlePrevious() {

        }

        function handleSkip() {

        }

        function handlePause() {

        }

        function handlePlay() {

        }

        return (
            <Box sx={boxFX}>
                <div className='youtubeWrapper'>
                    <YouTube videoId='zLYIvO4EZJ4' id='youtubePlayer'/>
                </div>
                <Box id='mediaCard'>
                    <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant='h6'>
                        Now Playing
                    </Typography>
                    <Typography variant='subtitle1' sx={{ marginLeft: 4, fontWeight: 'bold' }}>
                        Playlist: 
                    </Typography>
                    <Typography variant='subtitle1' sx={{ marginLeft: 4, fontWeight: 'bold' }}>
                        Song #: 
                    </Typography>
                    <Typography variant='subtitle1' sx={{ marginLeft: 4, fontWeight: 'bold' }}>
                        Title: 
                    </Typography>
                    <Typography variant='subtitle1' sx={{ marginLeft: 4, fontWeight: 'bold' }}>
                        Artist: 
                    </Typography>
                    <Box id='mediaControls' sx={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <IconButton onClick={handlePrevious}>
                            <FastRewindIcon id='iconSize'/>
                        </IconButton>
                        <IconButton onClick={handlePause}>
                            <StopIcon id='iconSize'/>
                        </IconButton>
                        <IconButton onClick={handlePlay}>
                            <PlayArrowIcon id='iconSize'/>
                        </IconButton>
                        <IconButton onClick={handleSkip}>
                            <FastForwardIcon id='iconSize'/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        )
    }

    function Comments() {
        const comments = {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            minHeight: '510px'
        }

        return (
            <Box id='commentsContainer'>
                <List sx={comments}>

                </List>
                <TextField variant="outlined" label="Add Comment"/>
            </Box>
        )
    }

    return (
        <Box id="youtubePlayContainer">
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Player">

                </Tab>
                <Tab label="Comments">

                </Tab>
            </Tabs>
            <TabPanel value={value} index={0}>
                <YoutubePlayer/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Comments/>
            </TabPanel>
        </Box>
    )
}