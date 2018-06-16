import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    var accessToken = params.access_token;
    this.state = {
      loggedIn: accessToken ? true : false,
      nowPlaying: {
        name: ' Not Checked',
        image: '',
        artists: ' Not Checked'
      },
      recentlyPlayed: {
        name1: '',
        image: '',
        artists: ' Not Checked'
      }
    }
    this.state.poop =  {
      loggedIn: accessToken ? true : false,

  }
    if(params.access_token){
      spotifyWebApi.setAccessToken(accessToken)
    }
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
      for(var i=0; i < response.legnth; i++) {
      }
      this.setState({
        recentlyPlayed: {
          name: response.items[i].track.album.name
        }
      })
    })
  }
  render() {
    return (
      <div class="container-fluid">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to MixCloud</h1>
            </header>
            <a href="http://localhost:8888/" class="btn btn-dark btn-lg active" role="button" aria-pressed="true">Login using Spotify</a>
              <div class='text-left'>
                Now Playing: { this.state.nowPlaying.name }
              </div>
              <div class='text-left mx-auto'>
              By: { this.state.nowPlaying.artists }
              </div>
              <div class='row'>
                <button style={{marigin: 20}} class='btn col-2' onClick={() => this.getNowPlaying()}>Check Now Playing</button>
              </div>
              <div>
                <img class="img float-left rounded" src={ this.state.nowPlaying.image } style={{width: 400}}/>
            </div>
            <div class="row">
              Recently Played: { this.state.recentlyPlayed.name }
            </div>
            <div class='row'>
              <button class='btn' onClick={() => this.getRecentlyPlayed()}>Check Recently Played</button>
            </div>
            </div>
          </div>
    );
  }
}

export default App;
