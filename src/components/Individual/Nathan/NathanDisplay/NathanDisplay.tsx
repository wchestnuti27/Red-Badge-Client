import React from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

type AcceptedProps = {
    visible: boolean,
    confirmLoading: boolean,
    ModalText: string,
    handleCancel: (e: any) => void,
    handleOk: (e: any) => void,
    okText: string
}

type TacoState = {
    shell: string,
    mixin: string,
    seasoning: string,
    condiment: string,
    base_layer: string,
    taco: string
}

export default class NathanDisplay extends React.Component<AcceptedProps, TacoState> {
    constructor(props: AcceptedProps) {
        super(props);

        this.state = {
            shell: '',
            mixin: '',
            seasoning: '',
            condiment: '',
            base_layer: '',
            taco: ''
        }
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/http://taco-randomizer.herokuapp.com/random/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    // shell: json.shell.name,
                    // mixin: json.mixin.name,
                    // seasoning: json.seasoning.name,
                    // condiment: json.condiment.name,
                    // base_layer: json.base_layer.name,
                    taco: `${json.base_layer.name} with ${json.mixin.name}, garnished with ${json.condiment.name} topped off with ${json.seasoning.name} and wrapped in delicious ${json.shell.name}.`
                })
            })

    }





    render() {
        // const supremeTaco = () => {
        //     return (
        //         <div style={{
        //             color: 'white'
        //         }}>
        //             Here be the shell: {this.state.shell}
        //             <br />
        //         Here be the mixin: {this.state.mixin}
        //             <br />
        //         Here be the seasoning: {this.state.seasoning}
        //             <br />
        //         Here be the condiment:  {this.state.condiment}
        //             <br />
        //         Here be the base layer: {this.state.base_layer}
        //             <br />
        //         </div>
        //     )
        // }
        return (
                <Modal
                    title="Taco Tuesday Special"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    okText={this.props.okText}
                    cancelText="No Thanks"
                    confirmLoading={this.props.confirmLoading}
                >
                    {/* <h6>{this.state.base_layer} with {this.state.mixin}, garnished with {this.state.condiment} topped off with {this.state.seasoning} and wrapped in delicious {this.state.shell}.</h6> */}
                    {/* {supremeTaco()} */}
                   { this.props.confirmLoading ? <p>{this.props.ModalText}</p> : <p>{this.state.taco}</p>}
                </Modal>
        )
    }
}