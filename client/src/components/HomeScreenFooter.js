import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export default function HomeScreenFooter() {
    const { store } = useContext(GlobalStoreContext);
    const [ footerText, setFooterText] = useState("")

    function handleCreateNewList() {
        store.createNewList();
    }

    const AddListButton = styled(Button)({
        variant: 'text',
        fontSize: '42pt',
        fontWeight: 'bold',
        color: 'black'
    })
    

    console.log("footer")
    console.log(store.currentScreen)
    let playlistName = ''
    if (store.listNameActive) {
        playlistName = store.currentList.name
    }
    return (
        <Box id="homescreenFooter">
            { store.listNameActive ?
                <Box sx={{transform: "translate(0%,15%)"}}>
                    { playlistName }
                </Box>
                :
                store.currentScreen === "HOME" ?
                <Box>
                    <AddListButton onClick={handleCreateNewList} variant="text">+</AddListButton>
                    Your Lists
                </Box>
                : ""
            }
        </Box>
    )
}