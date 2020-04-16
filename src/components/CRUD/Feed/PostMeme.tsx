import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, FormGroup,
    Form, Button, Label, Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import PublishIcon from '@material-ui/icons/Publish';

import './Feed.css';

type PostState = {
    memeImage: string | Blob,
    caption: string,
    voteCount: string,
    posting: boolean
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
            posting: false
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.memeImage === '') {
            alert('Please select a meme to upload');
        } else {

            this.setState({ posting: true });

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
                    this.props.getMemes(event)
                    this.props.closeNavPostModal(event)
                })
        }
    }

    changeMemeImage(e: any) {
        this.setState({ memeImage: e.target.files[0] });
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader toggle={(e) => this.props.closeNavPostModal(e)}>Post a SupreMeme</ModalHeader>
                {this.props.sessionToken ? <ModalBody>
                    <Form encType="multipart/form-data" onSubmit={event => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label htmlFor="memeImage">Choose an Image</Label>
                            <Input type="file" className='fileInput' onChange={e => this.changeMemeImage(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="caption">Caption</Label>
                            <Input type="text" placeholder={'ex: "Checkout this meme..."'} onChange={e => this.setState({ caption: e.target.value })} />
                        </FormGroup>
                        <Button
                            disabled={this.state.posting} type="submit" color='info'>
                            {this.state.posting ? <i>please wait...</i> : <p style={{ margin: 0 }}><PublishIcon /> Submit</p>}
                        </Button>
                    </Form>
                </ModalBody>

                    :

                    <ModalBody>
                        <div id='postLogin'>
                            <Link to='/account' id='link'>
                                <ListItem button>
                                    <ListItemIcon><PersonIcon /></ListItemIcon>
                                    <ListItemText primary='Login to post meme' />
                                </ListItem>
                            </Link>
                        </div>
                    </ModalBody>

                }

            </Modal>
        )
    }
}