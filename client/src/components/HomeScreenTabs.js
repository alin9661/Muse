import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import YouTube from 'react-youtube';

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

    function youtubePlayer() {
        let mediaCard = {

        }
        let controls = {
            justifyItems: 'center',
            borderRadius: 10,
            backgroundColor: 'white'

        }
        return (
            <Box sx={{display: 'flex'}}>
                <Card sx={{ display: 'flex'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <YouTube/>
                    </Box>
                </Card>
            </Box>
        )
    }

    function Comments() {
        const boxFX = {
            display: 'flex',
            flexDirection: 'column',
            bgcolor:"lightblue",
            alignItems: 'stretch',
            alignContent: 'flex-end'
        }
        const comments = {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll'
        }

        return (
            <Box sx={boxFX}>
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
                <youtubePlayer/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Comments
                <Comments/>
            </TabPanel>
        </Box>
    )
}