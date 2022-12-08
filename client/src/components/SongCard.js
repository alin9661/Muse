import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }

    function handleClick(event) {
        event.stopPropagation();
        if (event.detail === 1) {
            console.log("One click")
            console.log(store.currentList)
            store.loadSong(song, index+1);
        }
    }

    function handleEdit(event) {
        event.stopPropagation();
        if (event.detail === 2) {
            console.log("double clicked");
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <Box
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
            onDoubleClick={handleEdit}
        >
            <Typography sx={{fontSize: '20pt', fontWeight: 'bold'}} > {index + 1}. {song.title} by {song.artist} </Typography>
            <Button
                sx={{transform:"translate(-5%, -115%)", width:"5px", height:"30px"}}
                variant="contained"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleRemoveSong}>{"\u2715"}</Button>
        </Box>
    );
}

export default SongCard;