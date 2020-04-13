import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Modal, Button } from 'antd';

export default class WillDisplay extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      activity: '',
      type: '',
      visible: false,
      confirmLoading: false,
  }
};

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText} = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Will's Button
        </Button> 
        <Modal
          title="Information from Bored API"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
          <h4>Activity:  {this.props.activity}</h4>
          <br />
          <h4>Type:  {this.props.type}</h4>
        </Modal>
      </div>
    );
  }
}


























