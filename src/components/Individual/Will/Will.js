import React from 'react';
import WillDisplay from './WillDisplay';

export default class Will extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activity: '',
            type: '',
        }
    }

    componentWillMount () {
        console.log("component will mount");
    };

    componentDidMount () {
        console.log("component mounted");
    
    fetch(`https://www.boredapi.com/api/`)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        this.setState({
            activity: json.activity,
            type: json.type,
        })
        console.log(this.state.activity);
        console.log(this.state.type);
    });
}

    render() {
        return (
            <div>
                <WillDisplay />
            </div>
        )
    }
}


