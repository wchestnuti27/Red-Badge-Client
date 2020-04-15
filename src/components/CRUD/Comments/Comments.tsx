import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';

type AcceptedProps = {
    sessionToken?: any
    memeId: string,
    closeCommentModal: (e: any) => void,
    memeComments: any[]
}

type CommentState = {
    comment: string,
    flag: boolean
}

export default class Comments extends React.Component<AcceptedProps, CommentState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            comment: '',
            flag: true
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
                    // this.props.closeCommentModal(e)
                })
        } else { alert('please write a comment before posting.') }
    }

    displayComments = (memeComments: object[]) => {
        // this.props.memeComments.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));

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
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <FormGroup>
                            <Label htmlFor='comment'>Post a Comment!</Label>
                            <Input name='comment' placeholder='write your comment:' onChange={(e) => this.setState({ comment: e.target.value })}></Input>
                        </FormGroup>
                        <Button type='submit' color='info'>Post</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}


