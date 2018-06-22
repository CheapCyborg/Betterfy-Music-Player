import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
fontawesome.library.add(faStepBackward);
fontawesome.library.add(faPlay);
fontawesome.library.add(faPauseCircle);
fontawesome.library.add(faStepForward);
var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    var accessToken = params.access_token;
    this.state = {
      loggedIn: accessToken ? true : false,
      value: '',
      nowPlaying: {
        name: ' Not Checked  ',
        image: '',
        artists: ' Not Checked  '
      },
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
    this.handleChange = this.handleChange.bind(this);

    if(params.access_token){
      spotifyWebApi.setAccessToken(accessToken)
    }
  }
  handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url,
          artists: response.item.artists[0].name
        }
      })
    })
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
    return (
      <div class="container-fluid">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Betterfy</h1>
            </header>
            <form class="form-inline">
              <input type="text" id="searchAlbums" class='' value={this.state.value} onChange={this.handleChange} placeholder="Search for an Album"/>
              <button class="btn btn-small" id="clickMe" type="button" onClick={() => this.searchAlbums()}>Search</button>
            </form>
            <div class="text-left">
              <strong>Artists: </strong>
                {this.state.searchAlbums.artists} <br></br>
              <strong>Album: </strong>
                {this.state.searchAlbums.name} <br></br>
                <div>
                <img class="img rounded" src={ this.state.searchAlbums.image } style={{width: 200}}/>
                </div>
            </div>
            <div class="top-right">
              <a href="http://localhost:8888/" class="btn btn-dark active" role="button" aria-pressed="true">Login using Spotify</a>
            </div>
            <button class="btn btn-small" onClick={() => this.skipBackSong()}><i class="fas fa-step-backward"></i></button>
            <button class="btn btn-small" onClick={() => this.playCurrentSong()}><i class="fas fa-play"></i></button>
            <button class="btn btn-small" onClick={() => this.pauseCurrentSong()}><i class="fas fa-pause-circle"></i></button>
            <button class="btn btn-small" onClick={() => this.skipSong()}><i class="fas fa-step-forward"></i></button>
              <div>
                Now Playing: { this.state.nowPlaying.name }
              </div>
              <div>
              By: { this.state.nowPlaying.artists }
              </div>
              <div>
                <button style={{marigin: 20}} class='btn' onClick={() => this.getNowPlaying()}>Check Now Playing</button>
              </div>
              <div>
                <img class="img rounded" src={ this.state.nowPlaying.image } style={{width: 400}}/>
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
          </div>
    );
  }
}
export default App;
