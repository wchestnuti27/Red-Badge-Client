import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';

type AcceptedProps = {
    sessionToken?: any
    memeId: any[],
    closeCommentModal: (e: any) => void
}

type CommentState = {
    comment: string
}

export default class Comments extends React.Component<AcceptedProps, CommentState> {
    constructor(props: AcceptedProps){
        super(props)

        this.state = {
            comment: ''
        }
    }


    handleSubmit = (e: any) => {
        e.preventDefault();
        fetch('https://team6-red-badge-meme-server.herokuapp.com/comment/create', {
            method: 'POST',
            body: JSON.stringify({
                memeId: this.props.memeId,
                comment: this.state.comment,
                voteCount: 0,
                isReply: false
            }),
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : this.props.sessionToken
            })
        }).then((res) => res.json())
            .then((commentData) => {
                console.log(commentData)
                this.props.closeCommentModal(e)
            })
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader toggle={(e) => this.props.closeCommentModal(e)}>Comment Your Heart Out There Big Shoots</ModalHeader>
                <ModalBody>
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


