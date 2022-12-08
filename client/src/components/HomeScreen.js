import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import HomeScreenHeader from './HomeScreenHeader'
import HomeScreenTabs from './HomeScreenTabs'
import HomeScreenFooter from './HomeScreenFooter'

import List from '@mui/material/List';                                                                                                                                                                                                                                                                                                                                          
import Box from '@mui/material/Box'


/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store.idNamePairs) {
        listCard = 
            <List id='playlistContainer' sx={{width: '100%',
             bgcolor: 'background.paper', overflow: 'auto' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            </List>;
    }

    console.log("Homescreen")
    return (
        <div id="playlist-selector">
            <Box sx={{bgcolor:"silver"}} id="homescreen">
                <HomeScreenHeader />
                <HomeScreenTabs />
                {
                    listCard
                }
                <HomeScreenFooter/>
                <MUIDeleteModal />
            </Box>
        </div>
        )
}

export default HomeScreen;