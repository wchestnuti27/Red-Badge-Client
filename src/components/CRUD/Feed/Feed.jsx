import React, { Component } from 'react';
import FeedDisplay from './FeedDisplay';

export default class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            memes: [],
            url: 'https://team6-red-badge-meme-server.herokuapp.com/uploads/'
        }
    }

    componentDidMount() {
        fetch('https://team6-red-badge-meme-server.herokuapp.com/feed/all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                memes: json
            });
            console.log('MEMES', this.state.memes);
        })
    }

    render() {
        return (
            <div>                
                <FeedDisplay memes={this.state.memes} url={this.state.url} />   
            </div>
        )
    }
}
