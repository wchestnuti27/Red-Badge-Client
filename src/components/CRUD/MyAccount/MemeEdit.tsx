import React, { Component } from 'react'

import {
    Modal, ModalHeader, ModalBody, FormGroup,
    Form, Button, Label, Input
} from 'reactstrap';

type AcctState = {
    caption: string
}

type AcceptedProps = {
    sessionToken: string | null,
    memeId: string,
    memeCaption: string,
    closeEditModal: (e: any) => void,
    fetchUserMemes: () => void
}

export default class MemeEdit extends Component<AcceptedProps, AcctState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            caption: this.props.memeCaption
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
                this.props.fetchUserMemes();
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
                            <Input type="text" value={this.state.caption} onChange={e => this.setState({ caption: e.target.value })} />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}