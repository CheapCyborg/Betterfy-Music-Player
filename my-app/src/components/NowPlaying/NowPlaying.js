import React, { Component } from 'react';
import Buttons from '../playButtons/Buttons';
import Slider from 'react-rangeslider'
import '../../bootstrap.min.css';
import VolumeSlider from '../VolumeSlider';
import CommentBox from '../Comments/CommentBox';

var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();
window.onSpotifyWebPlaybackSDKReady = () => { };

export default class NowPlaying extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      webPlaybackInstance: null,
      checkComments: false,
      volume: 100,
      recentlyPlayed: {
        response: [],
        tracksChecked: false
      }
    };
  }

  handlePositionChange = (value) => {
    var Id = {
      deviceID: " "
    }
    spotifyWebApi.seek(value,Id).then(() => {
      console.log('seek');
    });
  }
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
      <div class="container-fluid">
          <div class="bottom-left">
            <VolumeSlider />
            <div class="media">
            <img src={album_image} alt={track_name} class="align-self-center mr-3 img-border" />
            <div class="song media-body">
              <h4 class="some-text"><a href={track_uri}>{track_name}</a><br></br> by <a href={artist_uri}>{artist_name}</a></h4>
              <h4 class="some-text"><a href={album_uri}>{album_name}</a></h4><br></br>
              <Buttons />
            </div>
          </div>
              <Slider
              min={0}
              max={duration_ms}
              step={60}
              value={position_ms}
              onChange={this.handlePositionChange}
              />
              <h4 class="some-text">Position: {this.millisToMinutesAndSeconds(position_ms)} <br></br> Duration: {this.millisToMinutesAndSeconds(duration_ms)}</h4>
              <button class="btn btn-small" type="button" onClick={() => this.setState({checkComments: true})}>Check/Leave a comment</button>
              {this.state.checkComments &&
                <div>
                  <button class="btn btn-small" type="button" onClick={() => this.setState({ checkComments: false })}>Close</button>
                  <CommentBox />
              </div> 
              }
          </div>
      </div>
    );
  }
}
