import React, { Component } from 'react';
import FeedDisplay from './FeedDisplay';

import CircularProgress from '@material-ui/core/CircularProgress';

type MemeState = {
    memes: any[]
}

type AcceptedProps = {
    sessionToken?: string
}

export default class Feed extends Component<AcceptedProps, MemeState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            memes: []
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
                this.setState({
                    memes: json
                });
                console.log('MEMES', this.state.memes);
            })
    }

    render() {
        return (
            <div>
                {this.state.memes !== [] ? <FeedDisplay memes={this.state.memes} /> : <CircularProgress />}
            </div>
        )
    }
}
