import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import WebPlaybackReact from './WebPlaybackReact.js';
import LoginCallback from './LoginCallback.js';
import IntroScreen from './Intro.js';
import NowPlayingScreen from './NowPlaying.js';
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
window.onSpotifyWebPlaybackSDKReady = () => {};
export default class App extends Component {

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
      },
      userDeviceId: null,
      userAccessToken: null,

      // Player state
      playerLoaded: false,
      playerSelected: false,
      playerState: null
    };
    this.handleChange = this.handleChange.bind(this);

    if(params.access_token){
      spotifyWebApi.setAccessToken(accessToken)
    }
  }

  componentWillMount() {
    LoginCallback({
      onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
      onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
    });
  }

  onSuccessfulAuthorization(accessToken) {
    this.setState({
      userAccessToken: accessToken
    });
  }

  onAccessTokenExpiration() {
    this.setState({
      userDeviceId: null,
      userAccessToken: null,
      playerLoaded: false,
      playerSelected: false,
      playerState: null
    });

    console.error("The user access token has expired.");
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

  render() {
    let {
      userDeviceId,
      userAccessToken,
      playerLoaded,
      playerSelected,
      playerState
    } = this.state;

    let webPlaybackSdkProps = {
      playerName: "Spotify React Player",
      playerInitialVolume: 2.0,
      playerRefreshRateMs: 100,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: (() => userAccessToken),
      onPlayerLoading: (() => this.setState({ playerLoaded: true })),
      onPlayerWaitingForDevice: (data => this.setState({ playerSelected: false, userDeviceId: data.device_id })),
      onPlayerDeviceSelected: (() => this.setState({ playerSelected: true })),
      onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
      onPlayerError: (playerError => console.error(playerError))
    };

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
              {!userAccessToken && <IntroScreen />}
            </div>

            <main>
            {userAccessToken &&
              <WebPlaybackReact {...webPlaybackSdkProps}>

              {!playerLoaded && !playerSelected &&
                <Fragment>
                  <h2 className="action-orange">Waiting for device to be selected</h2>
                </Fragment>
              }
              {!playerLoaded && playerSelected && playerState &&
                <Fragment>
                  <NowPlayingScreen playerState={playerState} />
                </Fragment>
              }
              </WebPlaybackReact>
            }
            </main>
            </div>
          </div>
    );
  }
}
