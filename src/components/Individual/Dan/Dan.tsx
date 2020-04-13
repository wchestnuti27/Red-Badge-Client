import React from 'react';
import DanDisplay from './DanDisplay';

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
        fetch(`https://jservice.io/api/random?count=1`)
            .then(response => response.json())
            .then(json => {
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
            <div>
                <DanDisplay
                    question={this.state.question}
                    answer={this.state.answer}
                    ansDisplay={this.state.ansDisplay}
                    toggleAnsDisplay={this.toggleAnsDisplay.bind(this)}
                />
            </div>
        );
    }
}

export default Dan;