import React, { Component } from 'react'
import './MyAccount.css';
import Votes from '../Votes/Votes';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


let cardHeight = 'auto';
let cardWidth = 200;
let imageHeight = 150;

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        backgroundColor: 'rgb(33,33,33)',
        color: 'white'
    },
    card: {
        height: cardHeight,
        width: cardWidth,
        backgroundColor: 'white',
        textAlign: 'center',
        marginBottom: '10px',
        color: 'rgb(33,33,33)'
    },
    image: {
        height: imageHeight,
        width: 'auto'
    },
    vote: {
        textAlign: 'center',
        flexDirection: 'column'
    },
    button: {
        color: 'blue' // icon color will override this, also changes color of animation
    }
})

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

        componentDidMount () {
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

<<<<<<< HEAD
=======
    MemeDisplay(memes: any[]) {
        const classes = useStyles()
            return memes.map((meme: any, index: number) => {
                return (
                    <Card className={classes.card} key={index}>
                        <CardActionArea>
                            <CardMedia className={classes.image} image={meme.url} />
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

>>>>>>> 5e93f858aa66b5c317f14f04d41f9112f2475100
    render() {
        return (
            <div>
                {this.MemeDisplay(this.state.userMemes)}
                {/* <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Update Meme</button>
                <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Delete Meme</button> */}
            </div>
        )
    }
}

export default MyAccount
