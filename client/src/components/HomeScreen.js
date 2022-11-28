import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/IconButton';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Icon, Toolbar } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Tooltip from '@mui/material/Tooltip';
import Sort from '@mui/icons-material/Sort';


/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            <Fab sx={{transform:"translate(1150%, 10%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            </List>;
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));

      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));

      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

      const searchFx = {
        
      }

    return (
        <div id="playlist-selector">
            {/* <div id="list-selector-heading">
            <Fab sx={{transform:"translate(-20%, 0%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                Your Playlists
            </div> */}
            <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                    <AppBar position='sticky'>
                        <Grid container>
                            <Tooltip title='Home'>
                                <IconButton>
                                        <HomeIcon/>
                                </IconButton>
                            </Tooltip>
                            <Grid item>
                                <Tooltip title='All Playlists'>
                                    <IconButton>
                                        <GroupsIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title='User Playlist'>
                                    <IconButton>
                                        <PersonIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4}>
                                <Search>
                                    <SearchIconWrapper>
                                    <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Grid>
                            <Grid item sx={{justifyContent: 'right'}}>
                                <IconButton sx={{display: 'flex', justifyContent: 'right'}}>
                                    <SortIcon></SortIcon>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </AppBar>

                {/* {
                    listCard
                } */}
                <MUIDeleteModal />
            </Box>
        </div>
        )
}

export default HomeScreen;