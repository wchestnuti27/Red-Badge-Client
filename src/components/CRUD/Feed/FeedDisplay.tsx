import React from 'react';
import Votes from '../Votes/Votes';
import Comments from '../Comments/Comments';

import './Feed.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import 'typeface-roboto';

type AcceptedProps = {
    sessionToken?: string | null,
    username?: string | null,
    memes: any[],
    getMemes: (e: any) => void
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
        this.props.getMemes(event)
    }

    // classes = useStyles();

    // componentDidMount() {

    displayMemes = (memes: object[]) => {
        this.props.memes.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));

        return this.props.memes.map((meme: any, index: number) => {
            console.log(meme.comments)
            return (
                <Card className='feedCard' key={index} >
                    <CardActionArea>
                        <CardMedia className='feedImage' image={meme.url} />

                        <Typography  id='feedCaption' variant="subtitle1">{meme.caption !== '' ? <p><p>{meme.caption}</p> <MoreHorizIcon /></p> : <p style={{ display: 'flex', justifyContent: 'flex-end' }}><MoreHorizIcon /></p>}</Typography>

                        <Typography variant="body2"><i>posted by {meme.username}</i></Typography>
                    </CardActionArea>
                    <CardContent className='cardContent'>
                        {/* <br /> */}
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
    // }

    render() {
        return (
            <div className='feed'>
                {this.props.sessionToken ? <h3 style={{ color: 'white', fontSize: "auto" }}>{`Welcome Back ${this.props.username}!`}</h3> : <h2 style={{ color: 'white' }}>Dank Memes</h2>}

                <div className='displayMemes'>
                    {this.displayMemes(this.props.memes)}
                    {this.state.commentModal ? <Comments memeComments={this.state.memeComments} sessionToken={this.props.sessionToken} closeCommentModal={this.closeCommentModal.bind(this)} memeId={this.state.memeId} /> : null}
                </div>
            </div>
        )

    }
}