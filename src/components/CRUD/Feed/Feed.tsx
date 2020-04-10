import React, { Component } from 'react';
import FeedDisplay from './FeedDisplay';
import PostMeme from './PostMeme';

import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

type MemeState = {
    memes: any[],
    postModal: boolean,
    // postFlag: boolean
}

type AcceptedProps = {
    sessionToken: string | null,
    // sessionToken?: string
}

export default class Feed extends Component<AcceptedProps, MemeState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            memes: [],
            postModal: false,
            // postFlag: false
        }
    }

    openPostModal(event: any) {
        this.setState({ postModal: true })
    }


    closePostModal(event: any) {
        this.setState({ postModal: false })
        console.log('did it work')

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
                console.log('MEMES', this.state.memes);
                console.log('getMemes fired after submit');
            })
    }

    // componentDidUpdate(){
    // if(this.state.postFlag) {
    //     console.log('anything')
    //     fetch('https://team6-red-badge-meme-server.herokuapp.com/feed/all', {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 memes: json
    //             });
    //             console.log('MEMES', this.state.memes);
    //         })
    //         this.setState({postFlag: false})
    //     }
    // }

    componentDidMount() {
        console.log(this.props.sessionToken)
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

                {/* <Button onClick={e => this.openPostModal(e)}><AddCircleOutlineIcon /></Button> */}
                {this.state.postModal ? <PostMeme getMemes={this.getMemes.bind(this)} closePostModal={this.closePostModal.bind(this)} sessionToken={this.props.sessionToken} /> : null}
               
                {this.state.memes !== [] ?
                    <FeedDisplay
                        sessionToken={this.props.sessionToken}
                        memes={this.state.memes}
                    />
                    : <CircularProgress />}

            </div>
        )
    }
}
