import React, { Component } from 'react'
// import Votes from '../Votes/Votes';

import './MyAccount.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


type AcctState = {
    userMemes: any[]
}

type AcceptedProps = {
    sessionToken: string | null
}

class MyAccount extends Component<AcceptedProps, AcctState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            userMemes: []
        }
    }

    checkSessionToken(token: string | null): string {
        if (token === null) {
            return 'no token'
        } else {
            return token
        }
    }

    componentDidMount() {
        console.log("component mounted");

        // Get Memes by user //
        fetch('https://team6-red-badge-meme-server.herokuapp.com/mymemes/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.checkSessionToken(this.props.sessionToken)
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userMemes: json
                });
                console.log(this.state.userMemes);
            })
    }

    MemeDisplay(memes: any[]) {
        return memes.map((meme: any, index: number) => {
            return (
                <Card className='card' key={index}>
                    <CardActionArea>
                        <CardMedia className='image' image={meme.url} />
                        <CardContent>
                            <Typography variant='h6'>{meme.caption}</Typography>
                            <Typography variant='body1'>Votes: {meme.voteCount}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        })
    }

    render() {
        return (
            <div className='myMemes'>
                <h2>My Account</h2>
                <i>"i used to have dreams, now all i have are memes" -- george washington (circa 1776)</i>
                <br />
                <br />
                <br />
                <div className='memeContainer'>
                    {this.MemeDisplay(this.state.userMemes)}
                    {/* <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Update Meme</button>
                <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Delete Meme</button> */}
                </div>
            </div>
        )
    }
}

export default MyAccount
