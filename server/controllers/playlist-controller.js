const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
const auth = require('../auth')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body;
    console.log("createPlaylist body: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    
    const name = new RegExp('Untitled'); // Helps mongodb read
    let numOfOccurences = 0;
    await Playlist.find( {ownerEmail: req.body.ownerEmail}, (err, playlists) => {
        playlists.forEach((playlist) => {
            if ( playlist.name.includes("Untitled") ) {
                numOfOccurences++;
            }
        })
    });

    const playlistParams = {
        name: 'Untitled ' + numOfOccurences,
        songs: body.songs,
        ownerEmail: body.ownerEmail
    };


    const playlist = new Playlist(playlistParams);
    console.log("playlist: " + playlist.toString());
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
    })
}
deletePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({});
                    }).catch(err => console.log(err))
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));

    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    console.log("getPlaylistPairs");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Playlists owned by " + email);
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                console.log("found Playlists: " + JSON.stringify(playlists));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    console.log("!playlists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    console.log("Send the Playlist pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
updatePlaylist = async (req, res) => {
    if(auth.verifyUser(req) === null){
        return res.status(400).json({
            errorMessage: 'UNAUTHORIZED'
        })
    }
    const body = req.body
    console.log("updatePlaylist: " + JSON.stringify(body));
    console.log("req.body.name: " + req.body.playlist.name);

    console.log(req.body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    console.log("req.body.name: " + req.body.name);

                    list.name = body.playlist.name;
                    list.songs = body.playlist.songs;
                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}

getPlaylistName = async (req, res) => {
    console.log("Inside getPlaylistName")
    console.log(req.params)
    await Playlist.find({name: req.params.name}, (err, playlistExists) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a unique playlist name'
            })
        }
        console.log(playlistExists)
        if (playlistExists.length === 0) {
            console.log("Success")
            return res.status(200).json({
                success: true
            })
        }
        console.log('Not successful')
        return res.status(400).json({
            success: false,
            error: 'You must provide a unique playlist name'
        })
    });
}

getHomeSearch = async (req, res) => {

}

getAllSearch = async (req, res) => {
    console.log('------------------------------------------------------------')
    console.log("All search")
    await Playlist.find( {isPublished: true}, (err, playlists) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: 'Something went wrong.'
            });
        }
        console.log("Successful search");
        // PUT ALL THE LISTS INTO ID, NAME PAIRS
        let pairs = [];
        for (let key in playlists) {
            let list = playlists[key];
            let pair = {
                _id: list._id,
                name: list.name
            };
            pairs.push(pair);
        }
        console.log(playlists)
        console.log(pairs)
        return res.status(200).json({ success: true, idNamePairs: pairs })
    })
}

getUserSearch = async (req, res) => {
    console.log('------------------------------------------------------------')
    console.log("User Search")
}

publishPlaylist = async (req, res) => {

}

duplicatePlaylist = async (req, res) => {
    console.log('------------------------------------------------------------')
    console.log("Duplicate")

    await Playlist.findById( {_id: req.body.id}, (err, dupPlaylist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        const playlistParams = {
            name: dupPlaylist.name,
            songs: dupPlaylist.songs,
            ownerEmail: req.body.email
        };
    
    
        let newPlaylist = new Playlist(playlistParams);
        console.log("playlist: " + newPlaylist.toString());
        if (!newPlaylist) {
            return res.status(400).json({ success: false, error: err })
        }

        User.findOne({ email: req.body.email }, (err, user) => {
            console.log("user found: " + JSON.stringify(user));
            user.playlists.push(newPlaylist._id);
            user
                .save()
                .then(() => {
                    newPlaylist
                        .save()
                        .then(() => {
                            return res.status(201).json({
                                success: true,
                                playlist: newPlaylist
                            })
                        })
                        .catch(error => {
                            return res.status(400).json({
                                success: false,
                                errorMessage: 'Playlist Not Created!'
                            })
                        })
                });
        })
    })
}

sortPlaylist = async (req, res) => {
    
}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getPlaylists,
    updatePlaylist,
    getPlaylistName,
    getHomeSearch,
    getAllSearch,
    getUserSearch,
    publishPlaylist,
    duplicatePlaylist,
    sortPlaylist
}