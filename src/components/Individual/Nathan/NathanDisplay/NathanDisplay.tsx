import React from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

type AcceptedProps = {
    visible: boolean,
    confirmLoading: boolean,
    ModalText: string,
    handleCancel: (e: any) => void,
    handleOk: (e: any) => void,
    impatientCustomer: (e: any) => void,
    impatient: boolean,
    okText: string,
    cancelText: string,
    impatientText: string
}

type TacoState = {
    shell: string,
    mixin: string,
    seasoning: string,
    condiment: string,
    base_layer: string,
    taco: string,
    waiting: boolean
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
            waiting: false,
            taco: 'In Route For Taste Buds, Next Stop - Flavorville'
        }
    }





    componentDidMount() {
        // console.log('taco fetch mounted')
        this.setState({waiting: true})
        setTimeout(() => {
            // console.log('timeout for taco fetch started')

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
                        shell: json.shell.name,
                        mixin: json.mixin.name,
                        seasoning: json.seasoning.name,
                        condiment: json.condiment.name,
                        base_layer: json.base_layer.name,
                        waiting: true,
                        taco: `${json.base_layer.name} with ${json.mixin.name}, garnished with ${json.condiment.name} topped off with ${json.seasoning.name} and wrapped in delicious ${json.shell.name}.`
                    })
                })

        }, 3500);
        this.setState({ waiting: false })
        // console.log('timeout for taco fect ended')
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
                onOk={!this.state.waiting ? this.props.impatientCustomer : this.props.handleOk}
                onCancel={this.props.handleCancel}
                okText={!this.state.waiting ? "Taco in route..." : this.props.okText}
                cancelText={this.props.cancelText}
                confirmLoading={this.props.confirmLoading}
            >
                {/* <h6>{this.state.base_layer} with {this.state.mixin}, garnished with {this.state.condiment} topped off with {this.state.seasoning} and wrapped in delicious {this.state.shell}.</h6> */}
                {/* {supremeTaco()} */}

                {this.props.confirmLoading ? <p>{this.props.ModalText}</p> : <p>{this.state.taco}</p>}
                {this.props.impatient && !this.state.waiting ? <p>{this.props.impatientText}</p> : null}
            </Modal>
        )
    }
}