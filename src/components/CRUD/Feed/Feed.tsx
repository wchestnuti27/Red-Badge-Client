import React, { Component } from 'react';
import FeedDisplay from './FeedDisplay';
import PostMeme from './PostMeme';

import CircularProgress from '@material-ui/core/CircularProgress';

type MemeState = {
    memes: any[],
    comments: any[],
    postModal: boolean,
}

type AcceptedProps = {
    sessionToken: string | null,
    username: string | null,
    navPostModal: boolean,
    closeNavPostModal: (e: any) => void,
    userRole: string | null
}

export default class Feed extends Component<AcceptedProps, MemeState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            memes: [],
            comments: [],
            postModal: false,
        }
    }

    closePostModal(event: any) {
        this.setState({ postModal: false })
        this.props.closeNavPostModal(event)
    }

    getMemes(event: any) {
        event.preventDefault()

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
            })
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
            })
    }

    render() {
        return (
            <div>
                {this.props.navPostModal ? <PostMeme closeNavPostModal={this.props.closeNavPostModal.bind(this)} getMemes={this.getMemes.bind(this)} closePostModal={this.closePostModal.bind(this)} sessionToken={this.props.sessionToken} /> : null}

                {this.state.memes.length !== 0 ?
                    <FeedDisplay
                        sessionToken={this.props.sessionToken}
                        username={this.props.username}
                        memes={this.state.memes}
                        getMemes={this.getMemes.bind(this)}
                        userRole={this.props.userRole}
                    />
                    : <p style={{ margin: 40 }} ><CircularProgress /> Loading...</p>}

            </div>
        )
    }
}
