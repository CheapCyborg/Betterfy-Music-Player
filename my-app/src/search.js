import React, { Component, Fragment } from 'react';
import WebPlaybackReact from './WebPlaybackReact.js';
var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();
window.onSpotifyWebPlaybackSDKReady = () => {};

export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      searchClicked: false,
      backClicked: false,
      searchAlbums: {
        name: '',
        artists: '',
        image: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }

  searchAlbums(){
    spotifyWebApi.searchAlbums(this.state.value)
    .then((response) => {
      this.setState({
        searchAlbums: {
          artists: response.albums.items[0].artists[0].name,
          name: response.albums.items[0].name,
          image: response.albums.items[0].images[0].url
        },
        searchClicked: true
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
      searchClicked,
      backClicked,
      playerLoaded,
      playerSelected,
    } = this.state;
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
      <main>
        <form>
          <input type="text" id="searchAlbums" class='' value={this.state.value} onChange={this.handleChange} placeholder="Search for an Album"/>
          <button class="btn btn-small" type="button" onClick={() => this.searchAlbums()}>Search</button>
        </form>
        <div class="slight-right">
          <h4><a href={track_uri}>{track_name}</a> by <a href={artist_uri}>{artist_name}</a></h4>
        </div>
        <div class="bottom-left">
          <button class="btn btn-small" onClick={() => this.skipBackSong()}><i class="fas fa-step-backward"></i></button>
          <button class="btn btn-small" onClick={() => this.playCurrentSong()}><i class="fas fa-play"></i></button>
          <button class="btn btn-small" onClick={() => this.pauseCurrentSong()}><i class="fas fa-pause-circle"></i></button>
          <button class="btn btn-small" onClick={() => this.skipSong()}><i class="fas fa-step-forward"></i></button>
        </div>
      {searchClicked &&
        <Fragment>
          <strong>Artists: </strong>
          {this.state.searchAlbums.artists} <br></br>
          <strong>Album: </strong>
          {this.state.searchAlbums.name} <br></br>
        </Fragment>
      }
        <div>
          <img class="img rounded" src={ this.state.searchAlbums.image } style={{width: 200}}/>
        </div>
        </main>
    );
  };
}
