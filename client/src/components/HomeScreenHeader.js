import { useContext, useState } from 'react';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
// import SearchBar from "material-ui-search-bar";

export default function HomeScreenHeader() {
const { auth } = useContext(AuthContext);
const { store } = useContext(GlobalStoreContext);
const [anchorEl, setAnchorEl] = useState(null);
const [ search, setSearch ] = useState("");
const isSortOpen = Boolean(anchorEl);

const handleSortOpen = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleSortClose = () => {
    setAnchorEl(null);
};

const FancyText = styled(TextField)({
  backgroundColor: 'lightgrey',
  display: 'flex',
  width: "100%",
  minWidth: 500,
})

const SearchBar = () => (
  <form>
    <FancyText
      id="search-bar"
      className="text"
      onChan={(e) => {
        setSearch(e.target.value);
      }}
      onKeyDown={handleKeyPress}
      label="Search"
      placeholder="Search..."
      size="small"
    />
  </form>
);

function handleHome() {
  store.getHomePlaylists();
}

function handleAllPlaylists() {
  store.getAllPlaylists();
}

function handleUsers() {
  store.getUserPlaylist();
}

function handleKeyPress(e) {
  if (e.keyCode === 13) {
    // Person clicked Enter -> Search
    console.log("Enter")
  }
}


function handleNameSort() {
  store.sortPlaylist("Name");
  handleSortClose();
}

function handleDateSort() {
  store.sortPlaylist("Date");
  handleSortClose();
}

function handleListensSort() {
  store.sortPlaylist("Listens");
  handleSortClose();

}

function handleLikesSort() {
  store.sortPlaylist("Likes");
  handleSortClose();
}

function handleDislikesSort() {
  store.sortPlaylist("Dislikes");
  handleSortClose();
}

const isGuest = auth.getUserEmail() === 'Guest';

console.log("Header")
  return (
      <AppBar position='sticky' id ="homescreenHeader">
          <Toolbar sx={{justifyContent: "flex-start"}}>
            <Box display='flex' flexGrow={1} sx={{justifyContent: 'left'}}>
              <Tooltip title='Home'>
                    <IconButton size='large' onClick={handleHome} disabled={isGuest}>
                            <HomeIcon id='iconSize'/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='All Playlists'>
                      <IconButton size='large' onClick={handleAllPlaylists}>
                          <GroupsIcon id='iconSize'/>
                      </IconButton>

                </Tooltip>
                <Tooltip title='User Playlist'>
                    <IconButton size='large' onClick={handleUsers}>
                        <PersonIcon id='iconSize'/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box display='flex' flexGrow={1} sx={{justifyContent: 'center'}}>
              {/* <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={handleKeyPress}
                    />
                </Search> */}
                <SearchBar></SearchBar>
            </Box>
            <Box display='flex' flexGrow={1} sx={{justifyContent: 'right'}}>
              <IconButton 
                    aria-controls="sortMenu"
                    onClick={handleSortOpen}
                    className='sortButton'
                    sx={{fontWeight: 'bold'}}
                  >
                    Sort By <SortIcon id='iconSize'/>
                </IconButton>
            </Box>
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
