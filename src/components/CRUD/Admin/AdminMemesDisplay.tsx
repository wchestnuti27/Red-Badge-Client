import React from 'react';

import Comments from '../Comments/Comments';

import './Admin.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type AdminDisplayProps = {
    userRole: string | null,
    allMemes: any[],
    sessionToken: string | null,
    getAllMemes: () => void,
}

type AdminDisplayState = {
    commentModal: boolean,
    memeId: string,
    memeComments: any[],
    memeUsername: string
}

export default class AdminMemesDisplay extends React.Component<AdminDisplayProps, AdminDisplayState> {
    constructor(props: AdminDisplayProps) {
        super(props)

        this.state = {
            commentModal: false,
            memeId: '',
            memeComments: [],
            memeUsername: ''
        }

    }

    openDisplayCommentModal = (memeId: string, memeComments: any[]) => {
        this.setState({
            commentModal: true,
            memeId: memeId,
            memeComments: memeComments
        })
    }

    closeDisplayCommentModal = () => {
        this.setState({ commentModal: false })
    }

    checkSessionToken = (token: string | null): string => {
        if (token === null) {
            return 'no token'
        } else {
            return token
        }
    }

    displayAllMemes = (memes: any[]) => {
        memes.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));

        return memes.map((meme: any, index: number) => {
            return (
                <div key={index}>
                    <Card className='card'>
                        <CardActionArea onClick={(e) => this.openDisplayCommentModal(meme.id, meme.comments)}>
                            <CardMedia className='image' image={meme.url} />
                            <CardContent>
                                <Typography variant="body1">{meme.caption}</Typography>
                                <Typography variant="body2"><i>posted by {meme.username}</i></Typography>
                                <Typography variant='body2'>Votes: {meme.voteCount}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className='deleteContainer'>
                            <DeleteForeverIcon color='error' fontSize='large' onClick={() => this.deleteMeme(meme.id)} />
                        </CardActions>
                    </Card>


                </div>
            )
        })
    }

    deleteMeme = (memeId: string) => {
        fetch(`https://team6-red-badge-meme-server.herokuapp.com/mymemes/delete/${memeId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.checkSessionToken(this.props.sessionToken)
            })
        })
            .then(res => this.props.getAllMemes())
    }

    render() {
        return (
            <div className='display'>
                {this.displayAllMemes(this.props.allMemes)}
                {this.state.commentModal ?
                    <Comments
                        sessionToken={this.props.sessionToken}
                        memeId={this.state.memeId}
                        closeCommentModal={this.closeDisplayCommentModal.bind(this)}
                        memeComments={this.state.memeComments}
                        userRole={this.props.userRole}
                    /> : null}
            </div>
        )
    }

}