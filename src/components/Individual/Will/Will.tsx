import React from 'react';
import WillDisplay from './WillDisplay';

type WillsProps= {

}

type WillsState = {

}

export default class Will extends React.Component {
    constructor(props: WillsProps) {
        super(props)

        this.state = {
            activity: '',
            type: '',
        }
    }

    componentDidMount () {
        console.log("component mounted");
    
    fetch(`http://www.boredapi.com/api/activity/`)
    .then(response => response.json())
    .then(json => console.log(json))

    // .then(response => response.json())
    // .then(json => {
    //     console.log(json);
    //     this.setState({
    //         activity: json.activity,
    //         type: json.type,
    //     })
    //     console.log(this.state.activity);
    //     console.log(this.state.type);
    // });
}

    render() {
        return (
            <div>
                <WillDisplay />
            </div>
        )
    }
}


