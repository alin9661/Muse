import { useContext, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Toolbar } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function HomeScreenHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isSortOpen = Boolean(anchorEl);

    const handleSortOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setAnchorEl(null);
    };

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

      function handleHome() {

      }

      function handleAllPlaylists() {

      }

      function handleUsers() {

      }
      
      function handleNameSort() {
        handleSortClose();

      }

      function handleDateSort() {
        handleSortClose();

      }

      function handleListensSort() {
        handleSortClose();

      }

      function handleLikesSort() {
        handleSortClose();

      }

      function handleDislikesSort() {
        handleSortClose();

      }

    return (
        <AppBar position='sticky' id ="homescreenHeader">
            <Toolbar sx={{justifyContent: "flex-start"}}>
                <Tooltip title='Home'>
                    <IconButton size='large' onClick={handleHome}>
                            <HomeIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='All Playlists'>
                    <IconButton size='large' onClick={handleAllPlaylists}>
                        <GroupsIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='User Playlist'>
                    <IconButton size='large' onClick={handleUsers}>
                        <PersonIcon/>
                    </IconButton>
                </Tooltip>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <IconButton 
                    size='large'
                    aria-controls="sortMenu"
                    onClick={handleSortOpen}
                    sx={{alignSelf: "flex-end"}}
                >
                    Sort By <SortIcon/>
                </IconButton>
                <Menu
                    id="sortMenu"
                    anchorEl={anchorEl}
                    open={isSortOpen}
                    onClose={handleSortClose}
                >
                    <MenuItem onClick={handleNameSort}>Name (A-Z)</MenuItem>
                    <MenuItem onClick={handleDateSort}>Publish Date (Newest)</MenuItem>
                    <MenuItem onClick={handleListensSort}>Listens (High - Low)</MenuItem>
                    <MenuItem onClick={handleLikesSort}>Likes (High - Low)</MenuItem>
                    <MenuItem onClick={handleDislikesSort}>Dislikes (High - Low)</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
