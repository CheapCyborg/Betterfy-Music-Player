import React, { Component, Fragment } from 'react'
import logo from './logo.svg';
import WebPlaybackReact from './WebPlaybackReact';
import LoginCallback from './components/Login/LoginCallback';
import IntroScreen from './components/Intro/Intro';
import NowPlayingScreen from './components/NowPlaying/NowPlaying';
import SearchScreen from './components/search/search';
import './App.css';
import './bootstrap.min.css';

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
      searchClicked: false,
      backClicked: false,
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
      userDeviceId: null,
      userAccessToken: null,
      // Player state
      playerLoaded: false,
      playerSelected: false,
      playerState: null
    };
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

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

 goSearch(){
  this.setState({
    searchClicked: true,
    backClicked: false
  })
}

goBack(){
  this.setState({
    searchClicked: false,
    backClicked: true
  })
}

  render() {
    let {
      userDeviceId,
      userAccessToken,
      playerLoaded,
      playerSelected,
      playerState,
      searchClicked,
      backClicked
    } = this.state;

    let webPlaybackSdkProps = {
      playerName: "Spotify React Player",
      playerInitialVolume: 1.0,
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

              {!playerLoaded && !searchClicked && playerSelected && playerState &&
                <Fragment>
                  <button class="btn btn-small"type="button" onClick={() => this.goSearch()}>Search</button>
                  <NowPlayingScreen playerState={playerState} />
                </Fragment>
              }

              {searchClicked && !backClicked &&
                <Fragment>
                  <SearchScreen playerState={playerState}/>
                  <button class="btn btn-small" type="button" onClick={() => this.goBack()}>Back</button>
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
