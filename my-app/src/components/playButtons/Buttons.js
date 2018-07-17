import React, { Component, Fragment } from 'react';
import WebPlaybackReact from '../../WebPlaybackReact';
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

export default class Buttons extends Component {
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
      <Fragment>
      <button class="btn btn-small" onClick={() => this.skipBackSong()}><i class="fas fa-step-backward"></i></button>
      <button class="btn btn-small" onClick={() => this.playCurrentSong()}><i class="fas fa-play"></i></button>
      <button class="btn btn-small" onClick={() => this.pauseCurrentSong()}><i class="fas fa-pause-circle"></i></button>
      <button class="btn btn-small" onClick={() => this.skipSong()}><i class="fas fa-step-forward"></i></button><br></br>
      </Fragment>
    );
  };
}
