/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
router.get(`/playlistName/:name`, auth.verify, PlaylistController.getPlaylistName)
router.get(`/searchHome`, auth.verify, PlaylistController.getHomeSearch)
router.get(`/searchAll`, PlaylistController.getAllSearch)
router.get(`/searchUser`, PlaylistController.getUserSearch)
router.get(`/publish/:id`, auth.verify, PlaylistController.publishPlaylist)
router.post(`/duplicate`, PlaylistController.duplicatePlaylist)
router.get(`/sortedList`, PlaylistController.sortPlaylist)

module.exports = router