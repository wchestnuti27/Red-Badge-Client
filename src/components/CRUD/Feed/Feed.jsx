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
            console.log(`https://team6-red-badge-meme-server.herokuapp.com/uploads/${json[0].url}`)
            this.setState({
                url: `https://team6-red-badge-meme-server.herokuapp.com/uploads/${json[0].url}`,
                caption: json[0].caption,
                voteCount: json[0].voteCount
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
