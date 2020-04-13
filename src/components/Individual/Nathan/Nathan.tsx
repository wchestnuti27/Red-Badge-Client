import React from 'react';
import NathanDisplay from './NathanDisplay/NathanDisplay'
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

type AcceptedProps = {

}

type TacoState = {
    visible: boolean,
    ModalText: string,
    confirmLoading: boolean,
    okText: string
}

export default class Nathan extends React.Component<AcceptedProps, TacoState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            ModalText: '',
            visible: false,
            confirmLoading: false,
            okText: 'Eat'
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            okText: 'Chowing Down...',
            ModalText: 'Commencing Taco Stomach...',
            confirmLoading: true
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                ModalText: '',
                okText: 'Eat'
            });
        }, 3500);
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                overflowY: 'hidden'
            }}>
                <h1 style={{
                    color: "white",
                    display: 'flex',
                    justifyContent: 'center'
                }}>Hungry?</h1>

                <br />

                <Button type="primary" onClick={this.showModal}>
                    PRESS FOR TACO
                </Button>
                {this.state.visible ? <NathanDisplay
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    ModalText={this.state.ModalText}
                    handleOk={this.handleOk.bind(this)}
                    handleCancel={this.handleCancel.bind(this)}
                    okText={this.state.okText}
                /> : null}
            </div>
        )
    }
}