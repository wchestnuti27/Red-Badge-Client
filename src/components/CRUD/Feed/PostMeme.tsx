import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, FormGroup,
    Form, Button, Label, Input
} from 'reactstrap';

type PostState = {
    memeImage: string | Blob,
    caption: string,
    voteCount: string
}

type AcceptedProps = {
    sessionToken: any
    closePostModal: (event: any) => any,
    getMemes: (event: any) => any,
    closeNavPostModal: (e: any) => void
}

export default class Feed extends Component<AcceptedProps, PostState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            memeImage: '',
            caption: '',
            voteCount: '0',
        }
    }

    // checkSessionToken(token: string | null): string {
    //     if (token === null) {
    //         return 'no token'
    //     } else {
    //         return token
    //     }
    // }

    handleSubmit(event: any) {
        // event.preventDefault();

        let formData = new FormData();
        formData.append('caption', this.state.caption);
        formData.append('voteCount', this.state.voteCount);
        formData.append('memeImage', this.state.memeImage);

        fetch('https://team6-red-badge-meme-server.herokuapp.com/mymemes/new', {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((jsonData) => {
                console.log(jsonData, 'post data')
                this.props.closeNavPostModal(event)
                this.props.getMemes(event)
                console.log("last")
            })
        //  .then(function alert('Meme Posted'))
        //  .then(
        //  )
    }

    changeMemeImage(e: any) {
        this.setState({ memeImage: e.target.files[0] });
    }

    render() {
        return (
            // <div>
            //     <form encType="multipart/form-data" onSubmit={event => this.handleSubmit(event)}>
            //         <label htmlFor="memeImage">Choose an Image</label>
            //         <input type="file" onChange={e => this.changeMemeImage(e)} />

            //         <label htmlFor="caption">Caption</label>
            //         <input type="text" onChange={e => this.setState({ caption: e.target.value })} />
            //         <button type="submit">submit</button>
            //     </form>
            // </div>
            <Modal isOpen={true}>
                <ModalHeader toggle={(e) => this.props.closeNavPostModal(e)}>Post a SupreMeme</ModalHeader>
                <ModalBody>
                    <Form encType="multipart/form-data" onSubmit={event => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label htmlFor="memeImage">Choose an Image</Label>
                            <Input type="file" onChange={e => this.changeMemeImage(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="caption">Caption</Label>
                            <Input type="text" onChange={e => this.setState({ caption: e.target.value })} />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}