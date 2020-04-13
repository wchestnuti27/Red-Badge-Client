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

    // handleSubmit(event) {
    //     event.preventDefault();

    componentDidMount () {
        console.log("record found");
    
    fetch(`https://cors-anywhere.herokuapp.com/http://www.boredapi.com/api/activity/`)
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
// }

    render() {
        return (
            <div>
                <WillDisplay activity={this.state.activity} type={this.state.type}/>
            </div>
        )
    }
}

export default Will;


