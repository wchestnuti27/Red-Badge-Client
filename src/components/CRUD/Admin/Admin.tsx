import React from 'react';

import { Button } from 'reactstrap';

import AdminMemesDisplay from './AdminMemesDisplay';

type AdminProps = {
    sessionToken: string | null,
    username: string | null
}

type AdminState = {
    allMemes: any[],
    showAllMemes: boolean
}

export default class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props)

        this.state = {
            allMemes: [],
            showAllMemes: false
        }
    }

    getAllMemes() {
        this.setState({ showAllMemes: true })

        fetch('https://team6-red-badge-meme-server.herokuapp.com/feed/all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    allMemes: json
                });
                console.log('ADMIN MEMES', this.state.allMemes);
            })
    }

    getAllUsers() {
        this.setState({ showAllMemes: false })

        // fetch request to see all user profiles (need to make an endpoint for this though)
    }

    render() {

        return (
            <div style={{ margin: 50 }}>
                <h3 style={{ color: 'white' }}>hello admin</h3>
                <p>how do you want to abuse your power today, {this.props.username}?</p>
                <hr style={{ borderColor: 'white' }} />
                <div>
                    <Button color='info' disabled={this.state.showAllMemes} onClick={() => this.getAllMemes()}>view all posts</Button>
                </div>
                <br />
                <div>
                    <Button color='info' onClick={() => this.getAllUsers()}>view all users</Button>
                </div>
                {
                    this.state.showAllMemes ?
                        <div>
                            <hr style={{ borderColor: 'white' }} />
                            <AdminMemesDisplay
                                allMemes={this.state.allMemes}
                                sessionToken={this.props.sessionToken}
                                getAllMemes={this.getAllMemes.bind(this)}
                            />
                        </div> : null
                }

            </div>
        )
    }
}