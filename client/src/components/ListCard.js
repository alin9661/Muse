import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuthContext from '../auth'
import { Link } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [listOpen, setListOpen] = useState(false);
    const [listCounter, setListCounter] = useState(0);
    const [isPublished, setIsPublished] = useState(false);
    const [songList, setSongList] = useState([]);
    const { idNamePair, selected } = props;

    useEffect(() => {
        if (auth.loggedIn && store.currentList) {
            if (store.currentList._id === idNamePair._id) {
                setListOpen(!listOpen);
                setSongList(store.currentList.songs);
            } else {
                setListOpen(false)
            }
        }
    }, [store.currentList]); 

    function handleLoadList(event, id) {
        event.stopPropagation();
        event.preventDefault();
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }

    function handleLike(event) {

    }

    function handleDislike() {

    }

    function handlePublish() {
        store.publishPlaylist(idNamePair._id);
    }

    function handleDuplicate() {
        store.duplicatePlaylist(idNamePair._id);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        event.preventDefault();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const FancyButton = styled(Button)({
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '18px',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '12pt',
        margin: '8px',
        '&hover': {
            backgroundColor: 'rgb(100,100,100)'
        },
    });

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt'}}
            button
            onDoubleClick={handleToggleEdit}
        >
            <Grid container direction="column">
                <Grid item>
                    <Typography variant='h3' sx={{ p: 1, flexGrow: 1, fontWeight: 'bold' }} >{idNamePair.name}</Typography>
                    { isPublished && <Box sx={{ transform: 'translate(-30%,-110%)',float: 'right'}}>
                        <IconButton>
                            <ThumbUpOffAltIcon/>
                        </IconButton>
                        <IconButton>
                            <ThumbDownOffAltIcon/>
                        </IconButton>
                    </Box> }
                    <Typography variant='subtitle1' sx={{p: 1}}> By: <Link to=''>{auth.getUserName()}</Link></Typography>
                </Grid>
                { listOpen && <Grid item>
                        <Box id='listContentsBox'>
                            {
                                songList.map((song, index) => (
                                    <SongCard
                                        id={'playlist-song-' + (index)}
                                        key={'playlist-song-' + (index)}
                                        index={index}
                                        song={song}
                                    />
                                )) 
                            }
                            { modalJSX }
                        </Box>
                        { !isPublished && <Grid sx={{float: 'left'}}>
                            <FancyButton onClick={handleAddNewSong}>
                                Add
                            </FancyButton>
                            <FancyButton onClick={handleUndo}>
                                Undo
                            </FancyButton>
                            <FancyButton onClick={handleRedo}>
                                Redo
                            </FancyButton>
                        </Grid> }
                        <Grid sx={{float: 'right'}} columnSpacing={2}>
                            { !isPublished && <FancyButton
                                onClick={handlePublish}
                             >
                                Publish
                            </FancyButton> }
                            <FancyButton
                             onClick={(event) => {handleDeleteList(event, idNamePair._id)}}
                            >
                                Delete
                            </FancyButton>
                            <FancyButton
                                onClick={handleDuplicate}
                            >
                                Duplicate
                            </FancyButton>
                        </Grid>
                    </Grid>
                }
                <Grid item>
                    <IconButton sx={{float: 'right'}} onClick={(event) => {handleLoadList(event, idNamePair._id)}}>
                        { listOpen ?
                        <KeyboardDoubleArrowUpIcon sx={{transform: "translate(0%,0%)", fontSize: '32pt',}} /> :
                        <KeyboardDoubleArrowDownIcon sx={{transform: "translate(0%,0%)", fontSize: '32pt',}} />
                        }
                    </IconButton>
                    <Box>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        //if showSongs { render the song cards} else return cardElement
        cardElement
    );
}

export default ListCard;