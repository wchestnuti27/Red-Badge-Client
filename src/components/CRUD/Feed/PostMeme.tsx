import React, { Component } from 'react';

type PostState = {
    memeImage: string | Blob,
    caption: string,
    voteCount: string
}

type AcceptedProps = {
    sessionToken: string | null
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

    checkSessionToken(token: string | null): string {
        if (token === null) {
            return 'no token'
        } else {
            return token
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('caption', this.state.caption);
        formData.append('voteCount', this.state.voteCount);
        formData.append('memeImage', this.state.memeImage);

        fetch('https://team6-red-badge-meme-server.herokuapp.com/mymemes/new', {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': this.checkSessionToken(this.props.sessionToken)
            })
        })
            .then(response => response.json())
            .then(jsonData => console.log(jsonData))
    }

    changeMemeImage(e: any) {
        this.setState({ memeImage: e.target.files[0] });
    }

    render() {
        return (
            <div>
                <form encType="multipart/form-data" onSubmit={event => this.handleSubmit(event)}>
                    <label htmlFor="memeImage">Choose an Image</label>
                    <input type="file" onChange={e => this.changeMemeImage(e)} />

                    <label htmlFor="caption">Caption</label>
                    <input type="text" onChange={e => this.setState({ caption: e.target.value })} />
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}