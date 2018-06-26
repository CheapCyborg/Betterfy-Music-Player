import React, { Component } from 'react';
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
      this.setState({
        recentlyPlayed: {
          name: response.items[0].track.album.name,
          image: response.items[0].track.album.images[0].url,
          artists: response.items[0].track.artists[0].name
        }
      })
    })
  }
  searchAlbums(){
    spotifyWebApi.searchAlbums(this.state.value)
    .then((response) => {
      this.setState({
        searchAlbums: {
          artists: response.albums.items[0].artists[0].name,
          name: response.albums.items[0].name,
          image: response.albums.items[0].images[0].url
        }
      })
    })
  }
  playCurrentSong(){
    var Id = {
      deviceID: " "
    }
    spotifyWebApi.play(Id)
  }
  pauseCurrentSong(){
    var Id = {
      deviceID: " "
    }
    spotifyWebApi.pause(Id)
  }

  skipSong(){
    var Id = {
      deviceID: " "
    }
    spotifyWebApi.skipToNext(Id)
  }
  skipBackSong(){
    var Id = {
      deviceID: " "
    }
    spotifyWebApi.skipToPrevious(Id)
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

      <div className="panel panel-default">
        <div className="panel-body">
          <img src={album_image} alt={track_name} /><br></br>
          <button class="btn btn-small" onClick={() => this.skipBackSong()}><i class="fas fa-step-backward"></i></button>
          <button class="btn btn-small" onClick={() => this.playCurrentSong()}><i class="fas fa-play"></i></button>
          <button class="btn btn-small" onClick={() => this.pauseCurrentSong()}><i class="fas fa-pause-circle"></i></button>
          <button class="btn btn-small" onClick={() => this.skipSong()}><i class="fas fa-step-forward"></i></button><br></br>
          <h4><a href={track_uri}>{track_name}</a> by <a href={artist_uri}>{artist_name}</a></h4>
          <h4><a href={album_uri}>{album_name}</a></h4>
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
        </div>
        <div>
          <img class="img rounded" src={ this.state.recentlyPlayed.image } style={{width: 400}}/>
        </div>
      </div>
    );
  }
}
