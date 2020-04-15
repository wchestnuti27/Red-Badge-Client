import React, { Component } from 'react';
import FeedDisplay from './FeedDisplay';
import PostMeme from './PostMeme';

import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

type MemeState = {
    memes: any[],
    comments: any[],
    postModal: boolean,
    // postFlag: boolean
}

type AcceptedProps = {
    sessionToken: string | null,
    username: string | null,
    navPostModal: boolean,
    closeNavPostModal: (e: any) => void

    // sessionToken?: string
}

export default class Feed extends Component<AcceptedProps, MemeState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            memes: [],
            comments: [],
            postModal: false,
            // postFlag: false
        }
    }

    // openPostModal(event: any) {
    //     this.setState({ postModal: true })
    // }


    closePostModal(event: any) {
        this.setState({ postModal: false })
        this.props.closeNavPostModal(event)
    }


    getMemes(event: any) {
        event.preventDefault()

        console.log('GET MEMES', this.props.sessionToken)

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
                // console.log('COMMENT FROM MEME ARRAY', this.state.memes[0].comments[0].comment)
            })

        // get all comments fetch
        // fetch('https://team6-red-badge-meme-server.herokuapp.com/comment/getAllComments', {
        //     method: 'GET',
        //     headers: new Headers({
        //         'Content-Type' : 'application/json'
        //     })
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({
        //             comments: json
        //         })
        //         console.log('COMMENTS', this.state.comments);
        //     })
    }

    render() {
        return (
            <div>
                {/* <Button onClick={e => this.openPostModal(e)}><AddCircleOutlineIcon /></Button> */}
                {this.props.navPostModal ? <PostMeme closeNavPostModal={this.props.closeNavPostModal.bind(this)} getMemes={this.getMemes.bind(this)} closePostModal={this.closePostModal.bind(this)} sessionToken={this.props.sessionToken} /> : null}

                {this.state.memes.length !== 0 ?
                    <FeedDisplay
                        sessionToken={this.props.sessionToken}
                        username={this.props.username}
                        memes={this.state.memes}
                        getMemes={this.getMemes.bind(this)}
                    />
                    :  <p style={{margin: 40}} ><CircularProgress /> Loading...</p>}

            </div>
        )
    }
}
