import React, { Component } from 'react';
import Buttons from './Buttons.js';
import './bootstrap.min.css';
var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();


export default class NowPlaying extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      recentlyPlayed: {
        name: '',
        image: '',
        artists: ' Not Checked  '
      },
      searchAlbums: {
        name: '',
        artists: '',
        image: ''
      }
    };
  }

  getRecentlyPlayed(){
    spotifyWebApi.getMyRecentlyPlayedTracks()
    .then((response) => {
      for(var i = 0; i<response.length; i++){
      this.setState({
        recentlyPlayed: {
          name: response.items[i].track.album.name,
          image: response.items[i].track.album.images[0].url,
          artists: response.items[i].track.artists[0].name
        }
      })
    }
    })
  }

getUserPlaylist(){
  spotifyWebApi.getMySavedTracks()
  .then((response) => {
    for(var i = 0; i<response.length; i++){
    this.setState({
      recentlyPlayed: {
        name: response.items[i].track.album.name,
        image: response.items[i].track.album.images[0].url,
        artists: response.items[i].track.artists[0].name
      }
    })
  }
  })
}

  render() {
    let {
      playerState,
      playerState: { position: position_ms }
    } = this.props;
    let {
      id,
      uri: track_uri,
      name: track_name,
      duration_ms,
      artists: [{
        name: artist_name,
        uri: artist_uri
      }],
      album: {
        name: album_name,
        uri: album_uri,
        images: [{ url: album_image }]
      }
    } = playerState.track_window.current_track;

    return (
      <div class="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <h4><a href={track_uri}>{track_name}</a> by <a href={artist_uri}>{artist_name}</a></h4>
            <h4><a href={album_uri}>{album_name}</a></h4>
            <img src={album_image} alt={track_name} /><br></br>
            <Buttons/>
            <h4>ID: {id} | Position: {position_ms} | Duration: {duration_ms}</h4>
          </div>
          <div>
            Recently Played: { this.state.recentlyPlayed.name }
          </div>
          <div>
            By: { this.state.recentlyPlayed.artists }
          </div>
          <div>
            <button class='btn' onClick={() => this.getRecentlyPlayed()}>Check Recently Played</button>
            <button class='btn' onClick={() => this.getUserPlaylist()}>Check Playlist</button>
          </div>
          <div>
            <img class="img rounded" src={ this.state.recentlyPlayed.image } style={{width: 400}}/>
          </div>
        </div>
      </div>
    );
  }
}
