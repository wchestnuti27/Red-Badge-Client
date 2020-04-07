import React, { Component } from 'react';

export default class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            memeImage: {},
            caption: '',
            voteCount: 0,


            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1YjkzNzliLTA4ZjAtNDhjNC1iZGYwLTBmYTFhMzkyNTlkNiIsImlhdCI6MTU4NjI5MzI4MywiZXhwIjoxNTg2Mzc5NjgzfQ.7280uQD043mzICIwx60J02yLHaQ8W1owDNDy7hAXT_Y'
        }
    }


    handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('caption', this.state.caption);
        formData.append('voteCount', this.state.voteCount);
        formData.append('memeImage', this.state.memeImage);

        fetch('https://team6-red-badge-meme-server.herokuapp.com/mymemes/new', {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': this.state.token
            })
        })
            .then(response => response.json())
            .then(jsonData => console.log(jsonData))
    }

    render() {
        return (
            <div>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <label htmlFor="memeImage">Choose an Image</label>
                    <input
                        type="file"
                        method="post"
                        encType="multipart/form-data"
                        onChange={e => this.setState({ memeImage: e.target.files[0] })}
                    />

                    <label htmlFor="caption">Caption</label>
                    <input type="text" onChange={e => this.setState({ caption: e.target.value })} />
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}