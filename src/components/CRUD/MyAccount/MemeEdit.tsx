import React, { Component } from 'react'

import {
    Modal, ModalHeader, ModalBody, FormGroup,
    Form, Button, Label, Input
} from 'reactstrap';

type AcctState = {
    userMemes: any[],
    caption: string
}

type AcceptedProps = {
    sessionToken: string | null,
    memeId: string,
    // openEditModal: (e: any) => void,
    closeEditModal: (e: any) => void,
    fetchUserMemes: (e: any) => void
}

export default class MemeEdit extends Component<AcceptedProps, AcctState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            userMemes: [],
            caption: ''
        }
    }

    checkSessionToken(token: string | null): string {
        if (token === null) {
            return 'no token'
        } else {
            return token
        }
    }

    editMeme(event: any, memeId: string) {
        event.preventDefault();

        // Update Memes by user //
        fetch(`https://team6-red-badge-meme-server.herokuapp.com/mymemes/update/${memeId}`, {
            method: 'PUT',
            body: JSON.stringify({
                caption: this.state.caption
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.checkSessionToken(this.props.sessionToken)
            })
        })
            .then(res => {
                this.props.closeEditModal(event);
            })
    }

    UpdateMemeImage(e: any) {
        this.setState({});
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader toggle={(e) => this.props.closeEditModal(e)}>Update this Meme</ModalHeader>
                <ModalBody>
                    <Form encType="multipart/form-data" onSubmit={event => this.editMeme(event, this.props.memeId)}>
                        <FormGroup>
                            <Label htmlFor="caption">Caption</Label>
                            <Input type="text" onChange={e => this.setState({ caption: e.target.value })} />
                        </FormGroup>
                    </Form>
                        <Button type="submit">Submit</Button>
                </ModalBody>
            </Modal>
        )
    }
}