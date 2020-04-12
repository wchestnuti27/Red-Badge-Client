import React from 'react';
import WillDisplay from './WillDisplay';

class Will extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activity: '',
            type: ''
        }
    }

    componentDidMount () {
        console.log("record found");
    
    fetch(`http://www.boredapi.com/api/activity/`)
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

export default Will;


