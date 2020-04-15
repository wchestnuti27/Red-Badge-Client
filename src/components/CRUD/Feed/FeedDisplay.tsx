import React from 'react';
import Votes from '../Votes/Votes';
import Comments from '../Comments/Comments';

import './Feed.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

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
                <Card className='card' key={index} >
                    <CardActionArea onClick={(e) => this.openCommentModal(e, meme.id, meme.comments)}>
                        <CardMedia className='image' image={meme.url} />
                        <CardContent className='cardContent'>
                            <Typography id='caption' variant="subtitle1">{meme.caption}</Typography>
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
            <div className='feed'>
                {this.props.sessionToken ? <h3 style={{ color: 'white' }}>{`Welcome Back ${this.props.username}!`}</h3> : <h2 style={{ color: 'white' }}>Dank Memes</h2>}

                <div className='displayMemes'>
                    {this.displayMemes(this.props.memes)}
                    {this.state.commentModal ? <Comments memeComments={this.state.memeComments} sessionToken={this.props.sessionToken} closeCommentModal={this.closeCommentModal.bind(this)} memeId={this.state.memeId} /> : null}
                </div>
            </div>
        )

    }
}