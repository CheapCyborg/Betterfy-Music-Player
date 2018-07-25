import React, { Component } from 'react';
import VSlider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

var Spotify = require('spotify-web-api-js');
const spotifyWebApi = new Spotify();

export default class VolumeSlider extends Component {
    constructor() {
        super();
        this.state = {
            volume: 100
        };
    }

    handleChange = (value) => {
        this.setState({
            volume: value
        })
        var Id = {
            deviceID: " "
        }
        spotifyWebApi.setVolume(value, Id).then(() => {
            console.log('Volume updated!');
        });
    }

    render() {
        let { volume } = this.state
        let volume_percentage = volume
        const wrapperStyle = { width: 300, margin: 30 };

        return (
            <div style={wrapperStyle}>
                <VSlider
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}