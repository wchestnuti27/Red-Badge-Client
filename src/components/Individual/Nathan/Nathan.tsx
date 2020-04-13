import React from 'react';
import NathanDisplay from './NathanDisplay/NathanDisplay'
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

type AcceptedProps = {}

type TacoState = {
    visible: boolean,
    ModalText: string,
    confirmLoading: boolean,
    okText: string,
    working: boolean,
    cancelText: string,
    impatient: boolean,
    impatientText: string
}

export default class Nathan extends React.Component<AcceptedProps, TacoState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            ModalText: '',
            visible: false,
            confirmLoading: false,
            okText: 'Eat',
            cancelText: 'No Thanks',
            working: false,
            impatient: false,
            impatientText: 'We know you are hungry, please wait...'
        }
    }

    componentDidMount() {
        console.log('the taco app has mounted')
    }

    showModal = () => {
        // if (!this.state.working) { 
        this.setState({
            visible: true,
        });
        // }
    };

    impatientCustomer = () => {
        this.setState({
            impatient: true
        })
    }

    handleOk = (e: any) => {
        this.setState({
            okText: 'Chowing Down...',
            ModalText: 'Commencing Taco Stomach...',
            cancelText: 'DISGUSTING',
            confirmLoading: true,
            working: true,
            impatient: false
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                ModalText: '',
                okText: 'Eat',
                cancelText: 'No Thanks',
                working: false,
                impatient: false
            });
        }, 3500);
    };

    handleCancel = (e: any) => {
        if (this.state.working) {
            this.setState({
                ModalText: 'Returning Taco to Kitchen...',
                okText: 'Spitting out food...',
                impatient: false
            });
        } else {
            this.setState({
                visible: false,
                ModalText: 'Returning Taco to Kitchen...',
                impatient: false
            })
        }
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
                    {this.state.working ? "HELPING WITH CUSTOMER" : "PRESS FOR TACO"}
                </Button>
                {this.state.visible ? <NathanDisplay
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    ModalText={this.state.ModalText}
                    handleOk={this.handleOk.bind(this)}
                    handleCancel={this.handleCancel.bind(this)}
                    okText={this.state.okText}
                    cancelText={this.state.cancelText}
                    impatientCustomer={this.impatientCustomer.bind(this)}
                    impatient={this.state.impatient}
                    impatientText={this.state.impatientText}
                /> : null}
            </div>
        )
    }
}