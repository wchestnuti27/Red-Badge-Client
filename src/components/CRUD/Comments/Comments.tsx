import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
// import DeleteComment from '../Comments/DeleteComment'
import './comments css/Comments.css'

import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PublishIcon from '@material-ui/icons/Publish';


type AcceptedProps = {
    sessionToken?: any
    memeId: string,
    closeCommentModal: (e: any) => void,
    memeComments: any[],
    username?: string | null | undefined,
    userRole?: string | null
}

type CommentState = {
    comment: string,
    // flag: boolean
    refreshedComments: any[],
    commentsToDisplay: any[]
}

export default class Comments extends React.Component<AcceptedProps, CommentState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            comment: '',
            // flag: false,
            refreshedComments: [],
            commentsToDisplay: this.props.memeComments
        }
    }

    handleSubmit = (e: any, memeId: string) => {
        e.preventDefault();
        if (this.state.comment !== '') {
            fetch('https://team6-red-badge-meme-server.herokuapp.com/comment/create', {
                method: 'POST',
                body: JSON.stringify({
                    memeId: this.props.memeId,
                    comment: this.state.comment,
                    voteCount: 0,
                    isReply: false
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            }).then((res) => res.json())
                .then((commentData) => {
                    this.refreshComments(memeId);
                    this.setState({
                        comment: ''
                    })
                    // this.displayComments()
                    // this.props.closeCommentModal(e)
                })
        } else { alert('please write a comment before posting.') }
    }

    refreshComments = (memeId: string) => {
        fetch(`https://team6-red-badge-meme-server.herokuapp.com/comment/getbymeme/${memeId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ commentsToDisplay: json })
            })
    }
    //

    handleDelete = (commentId: string, memeId: string) => {

        fetch(`https://team6-red-badge-meme-server.herokuapp.com/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then(() => {
            this.refreshComments(memeId);
        })
    }

    displayComments = (memeComments: object[]) => {

        return memeComments.map((individualComments: any, index: number) => {
            return (
                <div>
                    <p>
                        <i>{individualComments.posterUsername}: </i> {individualComments.comment}
                        {
                            individualComments.posterUsername === this.props.username || this.props.userRole === 'admin' ?
                                <HighlightOffIcon style={{ color: 'red' }} onClick={() => this.handleDelete(individualComments.id, this.props.memeId)} />
                                : null
                        }
                    </p>
                </div>
            )
        })
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader toggle={(e) => this.props.closeCommentModal(e)}>Comment Your Heart Out There Big Shoots</ModalHeader>
                <ModalBody>
                    {this.displayComments(this.state.commentsToDisplay)}
                    {/* {this.state.flag ? <p>{this.state.comment}</p> : null} */}
                    <Form onSubmit={e => this.handleSubmit(e, this.props.memeId)}>
                        {this.props.sessionToken ? <FormGroup>
                            {/* <Label htmlFor='comment'>Post a Comment!</Label> */}
                            <Input name='comment' placeholder='write your comment:' value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })}></Input>
                        </FormGroup>
                            :
                            <div id='commentLogin'>
                                <Link to='/account' id='link'>
                                    <ListItem button>
                                        <ListItemIcon><PersonIcon /></ListItemIcon>
                                        <ListItemText primary='Login to comment' />
                                    </ListItem>
                                </Link>
                            </div>}
                        {this.props.sessionToken ? <Button type='submit' color='info'><PublishIcon fontSize='small' /> Post</Button> : null}
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}