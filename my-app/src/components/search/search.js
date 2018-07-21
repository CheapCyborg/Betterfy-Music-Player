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
      albumInfoClicked: false,
      uriSet: false,
      searchAlbums: {
        response: []
      },
      albums: [],
      tracks: ['']

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
          searchClicked: true,
        });
      });
  }

  render() {
    let {
      searchClicked,
      playerLoaded,
      playerSelected,
    } = this.state;
    let {
      playerState,
      playerState: { position: position_ms }
    } = this.props;

    let {
      uri: track_uri,
      name: track_name,
      artists: [{
        name: artist_name,
        uri: artist_uri
      }],
      album: {
        images: [{ url: album_image }],
        uri: album_uri,
      }
    } = playerState.track_window.current_track;

    var albumTrackInfo = [];
    var albumInfoClicked = false;
    if(searchClicked) {
      return this.state.albums.map((t, counter) => {
       return t.artists.map((artistsArray) => {
         var albumUri = t.uri
         var albumID = t.id;
         var image = t.images[0].url;
         var artistsUri = artistsArray.uri;
         var artistName = artistsArray.name
          const albumInfo = () => {
            console.log(albumUri)
            if(this.state.uriSet){
            playerState.track_window.current_track = {
              uri: this.state.id,
              id: albumID,
              name: track_name,
              artists: [{
                name: artistName,
                uri: artistsUri
              }],
              album: {
                images: [{ url: image }],
                uri: albumUri,
              }
            }
              var Id = {
                deviceID: " ",
                albumID: albumID
              }
              console.log(playerState.track_window.current_track)
          }
           albumInfoClicked = true;
           console.log(albumID)
             spotifyWebApi.getAlbumTracks(albumID)
               .then(response => {
                 albumTrackInfo = response.items
                 let trackArray = albumTrackInfo.map((albumTrack) => { return " " + albumTrack.name });
                 let idArray = albumTrackInfo.map((trackID)=> { return trackID.uri})
                 this.setState({
                   tracks: trackArray,
                   id: idArray[0],
                   albumInfoClicked: true,
                   uriSet: true
                 })
                 
                 console.log(this.state.tracks) 
                 console.log(this.state.id)              
              })
            }
            
          return (
            <div class="result-container row">
              <div class="row">
                <img src={t.images[0].url} alt={t.name} class="image" height="256px" width="256px" data-toggle="tooltip" data-placement="top" title="Hooray!" /> {counter}
                <div class="middle">
                  <div key={t.name} class="text">
                    <a href="#" onClick={() => albumInfo()}> {t.name} </a><br></br>
                    {this.state.albumInfoClicked &&
                      <div>
                        <iframe src={"https://open.spotify.com/embed?uri=" + albumUri} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                      </div>
                    }
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
        </div>
        <div>
        </div>
        </main>
      </div>
    );
  };
}
