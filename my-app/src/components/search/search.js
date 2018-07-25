import React, { Component, Fragment } from 'react';
import '../../bootstrap.min.css';
import './search.css';
import Buttons from '../playButtons/Buttons';
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
      searchClicked: false,
      backClicked: false,
      albumInfoClicked: false,
      uriSet: false,
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
  
    if(searchClicked) {
      return this.state.albums.map((t, counter) => {
       return t.artists.map((artistsArray) => {
         var albumUri = t.uri
         var albumID = t.id;
          const albumInfo = () => {
            console.log(albumUri)
           console.log(albumID)
             spotifyWebApi.getAlbumTracks(albumID)
               .then(response => {
                 albumTrackInfo = response.items
                 let trackArray = albumTrackInfo.map((albumTrack, counted) => { counted += 1; return " " + counted + ". " + albumTrack.name});
                 albumTrackInfo.map((trackInfo)=> {
                console.log(trackInfo.uri)
                 this.setState({
                   tracks: trackArray,
                   albumInfoClicked: true,
                   uri: trackInfo,
                   uriSet: true
                 })
                 spotifyWebApi.play({
                   "context_uri": albumUri,
                   "offset": {
                     "position": 0,
                   }
                 })          
              })
               })
            }
            
          return (
            <div class="container-fluid">
            <div class="result-container">
                <div class="text-center">
                  <img key={counter} src={t.images[0].url} alt={t.name} class="images rounded d-block" height="256px" width="256px" data-toggle="tooltip" data-placement="top" title="Hooray!" /> {counter}
                </div>
                <div class="middle">
                  <div key={t.name} class="text">
                    <a href="#" onClick={() => albumInfo()}> {t.name} </a><br></br>
                    {this.state.albumInfoClicked &&
                      <div>
                        {this.state.tracks + ""}
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
    <div class="container-fluid">
      <main>
        <form>
          <input type="text" id="searchAlbums" class='' value={this.state.value} onChange={this.handleChange} placeholder="Search for an Album"/>
          <button class="btn btn-small" type="button" onClick={() => this.searchAlbums()}>Search</button>
        </form> 
        <div class="left   right">
            <div class="media">
              <img src={album_image} alt={track_name} class="align-self-center mr-3 images" />
              <div class="media-body">
                <h4 class="mt-0"><a href={track_uri}>{track_name}</a> 
                <br></br>by <a href={artist_uri}>{artist_name}</a></h4>
                <Buttons />
              </div>
            </div>
        </div>
       </main>
     </div>
    );
  };
}

