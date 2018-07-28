import React, { Component, Fragment } from "react";
import Login from "../Login/Login";

export default class IntroScreen extends Component {
  buttonClick(e) {
    e.preventDefault();
    Login.logInWithSpotify();
  }

  links = {
    announcement: "https://beta.developer.spotify.com/community/news/2017/11/20/announcing-the-new-spotify-web-playback-sdk-beta/",
  };

  render() {
    return (
      <Fragment>
        <h3 class="some-text">Betterfy</h3>
        <button className="btn btn-md btn-violet" onClick={this.buttonClick}>
          Log in with Spotify
				</button>
        <br />
        <a target="_blank" href={this.links.announcement}>
          Spotify Web Playback SDK
				</a>
        &nbsp;
			</Fragment>
    );
  }
}