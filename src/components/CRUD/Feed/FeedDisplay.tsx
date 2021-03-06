import React from 'react';
import Votes from '../Votes/Votes';
import Comments from '../Comments/Comments';
import ImageModal from './ImageModal';

import './Feed.css';

import memeQuotes from '../../../memeQuotes';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LaunchIcon from '@material-ui/icons/Launch';

import 'typeface-roboto';

type AcceptedProps = {
    sessionToken?: string | null,
    username?: string | null,
    memes: any[],
    getMemes: (e: any) => void,
    userRole: string | null
}

type FeedState = {
    commentModal: boolean,
    imageModal: boolean,
    memeId: string,
    memeComments: any[],
    memeUrl: string,
    memeCaption: string,
    memeUsername: string
}

export default class FeedDisplay extends React.Component<AcceptedProps, FeedState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            commentModal: false,
            imageModal: false,
            memeId: '',
            memeComments: [],
            memeUrl: '',
            memeCaption: '',
            memeUsername: ''
        }
    }

    // commentModal toggler logic //

    openCommentModal(event: any, memeId: string, memeComments: any[]) {
        this.setState({ commentModal: true, memeId: memeId, memeComments: memeComments })
    }

    closeCommentModal(event: any) {
        this.setState({ commentModal: false, memeId: '', memeComments: [] })
        this.props.getMemes(event)
    }

    openImageModal(memeUrl: string, memeCaption: string, memeUsername: string, memeComments: any[]) {
        this.setState({
            imageModal: true,
            memeUrl: memeUrl,
            memeCaption: memeCaption,
            memeUsername: memeUsername,
            memeComments: memeComments
        })
    }

    closeImageModal() {
        this.setState({
            imageModal: false,
            memeUrl: '',
            memeCaption: '',
            memeUsername: '',
            memeComments: []
        })
    }

    displayMemes = (memes: object[]) => {
        this.props.memes.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));

        return this.props.memes.map((meme: any, index: number) => {
            return (
                <Card className='feedCard' key={index} >
                    <CardActionArea
                        onClick={() => this.openImageModal(meme.url, meme.caption, meme.username, meme.comments)}
                    >
                        <CardMedia className='feedImage' image={meme.url} />

                        <Typography id='feedCaption' variant="subtitle1">{meme.caption !== '' ? <p><LaunchIcon /> Expand</p> : ''}</Typography>

                        <Typography variant="body2"><i>posted by {meme.username}</i></Typography>
                    </CardActionArea>
                    <CardContent className='cardContent'>
                        <CardActionArea style={{
                            display: 'flex',
                            alignItems: 'left',
                            borderBottom: 'thin solid #ced4da',
                            padding: 5
                        }}
                            onClick={(e) => this.openCommentModal(e, meme.id, meme.comments)}
                        >
                            <Typography id='commentSection' variant="body2">
                                {meme.comments[meme.comments.length - 1]

                                    ?

                                    <p><p><ChatBubbleOutlineIcon />    <i>{meme.comments[meme.comments.length - 1].posterUsername}:</i> {meme.comments[meme.comments.length - 1].comment}  </p><ArrowDropDownIcon /></p>

                                    :

                                    <p><ChatBubbleOutlineIcon />  Add a public comment...  <ArrowDropDownIcon /></p>}</Typography>
                            {/* <Typography id='commentSection' variant="body2"><ChatBubbleOutlineIcon /> click here to see comments!</Typography> */}      <ArrowDropDownIcon />

                        </CardActionArea>
                    </CardContent>
                    <Votes voteCount={meme.voteCount} memeId={meme.id} />
                </Card>
            )
        })
    }

    getQuoteOfTheDay() {
        const randomQuote = memeQuotes[Math.floor(Math.random() * memeQuotes.length)];
        return randomQuote;
    }

    render() {
        return (
            <div className='feed'>
                {this.props.sessionToken ? <h3 style={{ color: 'white', fontSize: "auto" }}>{`Welcome Back ${this.props.username}!`}</h3> : <h2 style={{ color: 'white' }}>SupreMemes</h2>}
                {/* <p>{this.getQuoteOfTheDay()}</p> */}

                <div className='displayMemes'>
                    {this.displayMemes(this.props.memes)}
                    {this.state.commentModal ?
                        <Comments
                            memeComments={this.state.memeComments}
                            sessionToken={this.props.sessionToken}
                            closeCommentModal={this.closeCommentModal.bind(this)}
                            memeId={this.state.memeId}
                            username={this.props.username}
                            userRole={this.props.userRole}
                        /> : null}
                    {this.state.imageModal ?
                        <ImageModal
                            memeUrl={this.state.memeUrl}
                            memeCaption={this.state.memeCaption}
                            memeUsername={this.state.memeUsername}
                            memeComments={this.state.memeComments}
                            closeImageModal={this.closeImageModal.bind(this)}
                        /> : null}
                </div>
            </div>
        )
    }
}