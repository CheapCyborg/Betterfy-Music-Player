import React, { Component } from 'react';
import Buttons from '../playButtons/Buttons';
import '../../bootstrap.min.css';

var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();
window.onSpotifyWebPlaybackSDKReady = () => { };

export default class NowPlaying extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      webPlaybackInstance: null,
      recentlyPlayed: {
        response: [],
        tracksChecked: false
      }
    };
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
            <div class="results-container">
          <div class="bottom-left">
                <img src={album_image} alt={track_name} class="align-self-center mr-3" />
                <div class="">
                  <h4><a href={track_uri}>{track_name}</a><br></br> by <a href={artist_uri}>{artist_name}</a></h4>
                  <h4><a href={album_uri}>{album_name}</a></h4>
                  <Buttons />
                  <h4>Position: {position_ms} | Duration: {duration_ms}</h4>
                </div>
          </div>
          <div>
            <img class="img rounded" src={ this.state.recentlyPlayed.image } style={{width: 400}}/>
          </div>
        </div>
      </div>
    );
  }
}
