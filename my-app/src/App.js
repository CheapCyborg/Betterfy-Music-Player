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
        name: 'Not Checked',
        image: ''
      }
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
          image: response.item.album.images[0].url
        }
      })
    })
  }
  render() {
    return (
      <div class="container">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to MixCloud</h1>
            </header>
            <a href="http://localhost:8888/" class="btn btn-dark btn-lg active" role="button" aria-pressed="true">Login using Spotify</a>
              <div>Now Playing: { this.state.nowPlaying.name }</div>
              <div>
                <img class="img-thumbnail" src={ this.state.nowPlaying.image } style={{width: 400}}/>
            </div>
            <button onClick={() => this.getNowPlaying()}>Check Now Playing</button>
            </div>
          </div>
    );
  }
}

export default App;
