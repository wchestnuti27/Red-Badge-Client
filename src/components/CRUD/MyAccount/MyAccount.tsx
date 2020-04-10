import React, { Component } from 'react'
import Votes from '../Votes/Votes';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
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

    handleSubmit(event: any) {
        event.preventDefault();

        // Get Memes by user //
        fetch('https://team6-red-badge-meme-server.herokuapp.com/mymemes/:userId', {
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
                    <Card key={index}>
                        <CardActionArea>
                            <CardMedia image={meme.url} />
                            <CardContent>
                                <Typography variant="h6">{meme.caption}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <Votes voteCount={meme.voteCount} memeId={meme.id} />
                        {/* <p>Brought to you by: {meme.username}</p> */}
                    </Card>
                )
            })
        }

    render() {
        return (
            <div>
                {this.MemeDisplay(this.state.userMemes)}
                <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Update Meme</button>
                <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Delete Meme</button>
            </div>
        )
    }
}

export default MyAccount
