import React, { Component } from 'react'

let style = {
    height: '200px',
    width: 'auto',
    borderRadius: '3%'
}

export default class Feed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: '',
            caption: '',
            voteCount: ''
        }
    }

    componentDidMount() {
        fetch('https://team6-red-badge-meme-server.herokuapp.com/feed/all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                url: `https://team6-red-badge-meme-server.herokuapp.com/${json[9].url}`,
                caption: json[9].caption,
                voteCount: json[9].voteCount
            })
        })
    }

    render() {
        return (
            <div>
                <h4>{this.state.caption}</h4>
                <img src={this.state.url} alt='meme' style={style} />
                <h4>votes: {this.state.voteCount}</h4>
            </div>
        )
    }
}
