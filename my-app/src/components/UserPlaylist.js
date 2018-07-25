import React, { Component } from 'react';
import ReactTable from "react-table";
import './react-table.css'
import '../bootstrap.min.css';

var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();

export default class UserPlaylist extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            recentlyPlayed: {
                response: [],
                tracksChecked: false
            }
        };
    }

    componentDidMount(){
        spotifyWebApi.getMySavedTracks({"limit": 50})
            .then((response) => {
               let array = response.items.map((savedTacks) => {return savedTacks.track}) 
               console.log(array)      
                this.setState({
                    recentlyPlayed: {
                        response: array,
                        tracksChecked: true
                    }
                })
            })
    }

    render(){

        const columns = 
        [{
            Header: 'Songs',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: "ID",
            accessor: "id",
        }]

        return(
            <div class="container-fluid">
            <ReactTable
                className="-striped -highlight"
                data={this.state.recentlyPlayed.response}
                columns={columns}
                defaultPageSize={10}
                showPageJump = {false}
                getTrProps={(state, rowInfo, name, instance) => {
                    return {
                        onClick: (e, handleOriginal) => {
                            let albumUri = rowInfo.original.album.uri
                            let trackuri = rowInfo.original.uri
                            spotifyWebApi.play({
                                "context_uri": albumUri,
                                "offset": {
                                     "uri": trackuri
                                }
                            }) 
                            if (handleOriginal) {
                                handleOriginal();
                            }
                        }
                    }
                }}
            />
            </div>
        );
    }
};