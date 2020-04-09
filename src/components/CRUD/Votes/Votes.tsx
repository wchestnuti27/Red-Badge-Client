import React, { Component } from 'react'
import VoteDisplay from './VoteDisplay';

type AcceptedProps = {
    voteCount: number
}

export default class Votes extends Component<AcceptedProps> {
    constructor(props: AcceptedProps) {
        super(props)

    }

    componentDidMount() {
        // logic for up/downvoting
    }

    render() {
        return (
            <div>
                <VoteDisplay voteCount={this.props.voteCount} />
            </div>
        )
    }
}
