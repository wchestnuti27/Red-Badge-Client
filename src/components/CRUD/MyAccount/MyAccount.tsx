import React, { Component } from 'react'

type AcctState = {
    userMemes: any[]
}

type AcceptedProps = {
    sessionToken: string | null
}

export class MyAccount extends Component<AcceptedProps, AcctState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            userMemes: []
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

        // Get Memes by user //
        fetch('https://team6-red-badge-meme-server.herokuapp.com/mymemes/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.checkSessionToken(this.props.sessionToken)
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userMemes: json
                });
                console.log(this.state.userMemes);
            })
    }

    render() {
        return (
            <div>
                <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Update Meme</button>
                <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Delete Meme</button>
            </div>
        )
    }
}

export default MyAccount
