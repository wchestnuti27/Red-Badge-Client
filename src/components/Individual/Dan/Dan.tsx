import React from 'react';
import DanDisplay from './DanDisplay';

type DanState = {

}

type DanProps = {

}

class Dan extends React.Component<DanProps, DanState> {
    constructor(props: DanProps) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        fetch(`http://jservice.io/api/random?count=1`)
            .then(response => response.json())
            .then(json => console.log(json))

    }

    render() {
        return (
            <div>
                <DanDisplay />
            </div>
        );
    }
}

export default Dan;