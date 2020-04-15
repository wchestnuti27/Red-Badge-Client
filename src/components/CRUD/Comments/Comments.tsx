import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
// import DeleteComment from '../Comments/DeleteComment'
import './comments css/Comments.css'

import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

type AcceptedProps = {
    sessionToken?: any
    memeId: string,
    closeCommentModal: (e: any) => void,
    memeComments: any[]
}

type CommentState = {
    comment: string,
    // flag: boolean
    refreshedComments: any[]
}

export default class Comments extends React.Component<AcceptedProps, CommentState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            comment: '',
            // flag: false,
            refreshedComments: []
        }
    }

    handleSubmit = (e: any) => {
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
                    console.log(commentData)
                    // this.setState({
                    //     flag: true
                    // })
                    // this.displayComments()
                    this.props.closeCommentModal(e)
                })
        } else { alert('please write a comment before posting.') }
    }

    refreshComments = (e: any) => {
        fetch('https://team6-red-badge-meme-server.herokuapp.com/comment/getbymeme/:id ', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(json => {

            })
    }

    // handleDelete = (e: any) => {
    //     e.preventDefault();
    //     fetch('https://team6-red-badge-meme-server.herokuapp.com/comment/delete/:commentId', {
    //         method: 'DELETE',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': this.props.sessionToken
    //         })
    //     }).then(() => )
    // }

    displayComments = (memeComments: object[]) => {
        // this.props.memeComments.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));
        // memeComments.sort((a: any, b: any) => (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0));

        return this.props.memeComments.map((individualComments: any, index: number) => {
            // console.log(meme.id)

            return (
                <div>
                    <p><i>{individualComments.posterUsername}: </i> {individualComments.comment}</p>

                </div>
            )
        })
    }

    render() {
        console.log('comment modal')
        console.log(this.props.memeComments)
        return (
            <Modal isOpen={true}>
                <ModalHeader toggle={(e) => this.props.closeCommentModal(e)}>Comment Your Heart Out There Big Shoots</ModalHeader>
                <ModalBody>
                    {this.displayComments(this.props.memeComments)}
                    {/* {this.state.flag ? <p>{this.state.comment}</p> : null} */}
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        {this.props.sessionToken ? <FormGroup>
                            {/* <Label htmlFor='comment'>Post a Comment!</Label> */}
                            <Input name='comment' placeholder='write your comment:' onChange={(e) => this.setState({ comment: e.target.value })}></Input>
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
                        {this.props.sessionToken ? <Button type='submit' color='info'>Post</Button> : null}
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}


