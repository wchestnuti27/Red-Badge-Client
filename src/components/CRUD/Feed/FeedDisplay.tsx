import React from 'react';
import Votes from '../Votes/Votes';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

let cardHeight = 'auto';
let cardWidth = 200;
let imageHeight = 150;

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(33,33,33)',
        color: 'white',
        textAlign: 'center'
    },
    memeContainer: {
        display: 'flex',
        flexFlow: 'row-reverse wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        height: cardHeight,
        width: cardWidth,
        backgroundColor: 'white',
        textAlign: 'center',
        margin: '10px',
        color: 'rgb(33,33,33)',
        border: 'thin solid white'
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

type AcceptedProps = {
    sessionToken?: string | null,
    memes: any[]
}

const FeedDisplay = ({ sessionToken, memes }: AcceptedProps) => {

    const classes = useStyles();

    const displayMemes = (memes: object[]) => {
        return memes.map((meme: any, index: number) => {
            return (
                <Card key={index} className={classes.card}>
                    <CardActionArea>
                        <CardMedia className={classes.image} image={meme.url} />
                        <CardContent>
                            <Typography variant="h6">{meme.caption}</Typography>
                            <Typography variant="body2">{meme.username}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <Votes voteCount={meme.voteCount} memeId={meme.id} />
                </Card>
            )
        })
    }

    return (
        <div className={classes.root}>
            {sessionToken ? <h3>Welcome Back!</h3> : <h2>Dank Memes</h2>}

            <div className={classes.memeContainer}>
                {displayMemes(memes)}
            </div>
        </div>
    )
}

export default FeedDisplay;