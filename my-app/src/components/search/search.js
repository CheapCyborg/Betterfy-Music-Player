import React, { Component, Fragment } from 'react';
import '../../bootstrap.min.css';
import './search.css';
import Buttons from '../playButtons/Buttons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import fontawesome from '@fortawesome/fontawesome';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
fontawesome.library.add(faPlay);
var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();
window.onSpotifyWebPlaybackSDKReady = () => {};

export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      searchClicked: false,
      backClicked: false,
      searchAlbums: {
        response: []
      },
      albums: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
  }

  handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }

  searchAlbums() {
    spotifyWebApi.searchAlbums(this.state.value)
      .then((response) => {
        this.setState({ 
          albums: response.albums.items ,
          searchClicked: true
        });
      });
  }

  render() {
    let {
      searchClicked,
      backClicked,
      playerLoaded,
      playerSelected,
    } = this.state;
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
     
    if(searchClicked) {
      const tooltip = (
        <Tooltip id="tooltip">
          <strong>Holy guacamole!</strong> Check this info.
        </Tooltip>
      );
      return this.state.albums.map((t) => {
       return t.artists.map((artistsArray) => {
          return (
            <div class="result-container row">
              <div class="col-sm">
              <img src={t.images[0].url} alt={t.name} class="image" height="256px" width="256px" data-toggle="tooltip" data-placement="top" title="Hooray!" /> 
                <div class="middle">
                  <div key={t.name} class="text">
                    Album: {t.name} <br></br>
                    Artrist: {artistsArray.name}
                    <i class="fas fa-play"></i>
                  </div>
                  </div>
              </div>
            </div>
          )
       });
    });
  }

    return (
    <div class="container">
      <main>
        <form>
          <input type="text" id="searchAlbums" class='' value={this.state.value} onChange={this.handleChange} placeholder="Search for an Album"/>
          <button class="btn btn-small" type="button" onClick={() => this.searchAlbums()}>Search</button>
        </form>
        <div class="slight-right col">
          <img src={album_image} alt={track_name} /><br></br><h4><a href={track_uri}>{track_name}</a> by <a href={artist_uri}>{artist_name}</a></h4>
        </div>
        <div class="bottom-left">
          <Buttons/>
        </div>
        <div>
          <img class="img rounded" src={ this.state.searchAlbums.image } style={{width: 200}}/>
        </div>
        </main>
      </div>
    );
  };
}
