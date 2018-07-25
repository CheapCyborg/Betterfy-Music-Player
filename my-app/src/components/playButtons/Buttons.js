import React, { Component, Fragment } from 'react';
import WebPlaybackReact from '../../WebPlaybackReact';
import classnames from 'classnames';
import fontawesome from '@fortawesome/fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
import faRandom from '@fortawesome/fontawesome-free-solid/faRandom';

fontawesome.library.add(faStepForward, faRandom, faPauseCircle, faPlay, faStepBackward);

var Spotify = require('spotify-web-api-js');
var classNames = require('classnames');
const spotifyWebApi = new Spotify();

export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isPressed: false,
      isPressedAgain: false,
      clicked: 0
    };
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
  click() {
    var Id = {
      deviceID: " "
    }
    this.setState(prevState => ({
      isPressed: !prevState.isPressed
    }))
    if(this.state.clicked == 0) {
      spotifyWebApi.setShuffle(true, Id)
      this.setState({
        clicked: 1
      })
    }
    if(this.state.clicked == 1){
      spotifyWebApi.setShuffle(false, Id)
      this.setState({
        clicked: 0
      })
    }
  }

  render() {
    let btnClass = classNames({
      btn: true,
      'shuffled': this.state.isPressed,
    });    
    return (
      <Fragment>
      <button class="btn btn-small" onClick={() => this.skipBackSong()}><i class="fas fa-step-backward"></i></button>
      <button class="btn btn-small" onClick={() => this.playCurrentSong()}><i class="fas fa-play"></i></button>
      <button class="btn btn-small" onClick={() => this.pauseCurrentSong()}><i class="fas fa-pause-circle"></i></button>
      <button class="btn btn-small" onClick={() => this.skipSong()}><i class="fas fa-step-forward"></i></button><br></br>
        <button class={`btn btn-small${btnClass}`} onClick={() => this.click()}><i class={`fas fa-random`}></i> {this.state.isPressed}</button>
      </Fragment>
    );
  };
}
