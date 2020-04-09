import React, { Component } from 'react'
import VoteDisplay from './VoteDisplay';

type AcceptedProps = {
    voteCount: number,
    memeId: string
}

type VoteState = {
    voteCount: number
}

export default class Votes extends Component<AcceptedProps, VoteState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            voteCount: props.voteCount
        }
    }

    componentDidMount() {
        // do we need to refresh component after vote?
    }

    changeVote(vote: number) {
        this.setState({
            voteCount: this.state.voteCount + vote
        })
    }

    voteOnMeme(event: any, memeId: string, vote: number) {
        event.preventDefault();

        // this.setState({ voteCount: this.state.voteCount + vote })

        fetch(`https://team6-red-badge-meme-server.herokuapp.com/vote/${memeId}`, {
            method: 'PUT',
            body: JSON.stringify({
                voteCount: this.state.voteCount
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    }

    render() {
        return (
            <div>
                <VoteDisplay
                    voteCount={this.state.voteCount}
                    memeId={this.props.memeId}
                    changeVote={this.changeVote.bind(this)}
                    voteOnMeme={this.voteOnMeme.bind(this)}
                />
            </div>
        )
    }
}
