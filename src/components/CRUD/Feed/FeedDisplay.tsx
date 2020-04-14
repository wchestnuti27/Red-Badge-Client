import React from 'react';
import Votes from '../Votes/Votes';
import Comments from '../Comments/Comments';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

let cardHeight = 'auto';
let cardWidth = 250;
let imageHeight = 200;
let imageWidth = cardWidth;

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(33,33,33)',
        color: 'white',
        textAlign: 'center'
    },
    memeContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
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
        width: imageWidth,
        // maxWidth: '100%',
        // maxHeight: 200,
        objectFit: 'fill'
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
    username?: string | null,
    memes: any[],
}

type FeedState = {
    commentModal: boolean,
    memeId: string,
    memeComments: any[]
}

export default class FeedDisplay extends React.Component<AcceptedProps, FeedState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            commentModal: false,
            memeId: '',
            memeComments: []
        }
    }

    // commentModal toggler logic

    openCommentModal(event: any, memeId: string, memeComments: any[]) {
        this.setState({ commentModal: true, memeId: memeId, memeComments: memeComments })
        console.log('open commentModal fired')
        
    }

    closeCommentModal(event: any) {
        this.setState({ commentModal: false, memeId: '' })
        console.log('close commentModal fired')
    }

    // classes = useStyles();

    // componentDidMount() {
        
       displayMemes = (memes: object[]) => {
        this.props.memes.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));
        
        return this.props.memes.map((meme: any, index: number) => {
            // console.log(meme.id)
            return (
                <Card style={{width: 500}} key={index}>
                    <CardActionArea onClick={(e) => this.openCommentModal(e, meme.id, meme.comments)}>
                        <CardMedia style={{height: 300}} image={meme.url} />
                        <CardContent>
                            <Typography variant="h6">{meme.caption}</Typography>
                            <Typography variant="body2"><i>posted by {meme.username}</i></Typography>
                            <br />
                            <Typography variant="body2"><p>{meme.comments[0] ? meme.comments[0].comment : 'no comments yet, be the first to comment:'}</p></Typography>
                            
                        </CardContent>
                    </CardActionArea>
                    <Votes voteCount={meme.voteCount} memeId={meme.id} />
                </Card>
            )
        })
        }
    // }

    render() {
        return (
            <div>
                {this.props.sessionToken ? <h3 style={{ color: 'white' }}>{`Welcome Back ${this.props.username}!`}</h3> : <h2 style={{ color: 'white' }}>Dank Memes</h2>}

                <div>
                    {this.displayMemes(this.props.memes)}
                    {this.state.commentModal ? <Comments memeComments={this.state.memeComments} sessionToken={this.props.sessionToken} closeCommentModal={this.closeCommentModal.bind(this)} memeId={this.state.memeId} /> : null}
                </div>
            </div>
        )

    }
}