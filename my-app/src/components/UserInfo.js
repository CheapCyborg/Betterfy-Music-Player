import React, { Component } from 'react';
import ReactTable from "react-table";
import './react-table.css'
import '../bootstrap.min.css';
import './UserInfo.css'

var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();

export default class UserInfo extends Component {
    constructor(){
        super();
        this.state = {
            usersInfo: {},
            images: [],
            userURL: ''
        }
    }

    componentDidMount(){
        spotifyWebApi.getMe()
        .then((response) => {
            this.setState({
                usersInfo: response,
                images: response.images[0].url,
                userURL: response.external_urls.spotify
            })
        })
    }
    render(){
        return(
            <div class="container-fluid">
            
                <div class="user-card">
                    <img class="image" src={this.state.images} alt="Avatar" />
                    <div class="info">
                        <strong><a href={this.state.userURL}>{this.state.usersInfo.display_name}</a></strong> <br></br>
                        {this.state.usersInfo.birthdate}<br></br>
                        {this.state.usersInfo.email}
                    </div>
                </div>
            </div>
        );
    }
}