import React from 'react';
import DanDisplay from './DanDisplay';

import CircularProgress from '@material-ui/core/CircularProgress';

type DanState = {
    question: string,
    answer: string,
    ansDisplay: boolean
}

type DanProps = {

}

class Dan extends React.Component<DanProps, DanState> {
    constructor(props: DanProps) {
        super(props);

        this.state = {
            question: '',
            answer: '',
            ansDisplay: false
        };
    }

    componentDidMount() {
        console.log('fetching jeopardy questions...');
        fetch(`https://cors-anywhere.herokuapp.com/http://jservice.io/api/random?count=1`)
            .then(response => response.json())
            .then(json => {
                console.log('jeopardy question found!');
                this.setState({
                    question: json[0].question,
                    answer: json[0].answer
                })
            })

    }

    toggleAnsDisplay() {
        this.setState({
            ansDisplay: !this.state.ansDisplay
        });
    }

    render() {
        return (
            <div style={{ backgroundColor: 'rgb(33,33,33)' }}>
                {
                    this.state.question === '' ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </div>
                        : <div>
                            <DanDisplay
                                question={this.state.question}
                                answer={this.state.answer}
                                ansDisplay={this.state.ansDisplay}
                                toggleAnsDisplay={this.toggleAnsDisplay.bind(this)}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default Dan;