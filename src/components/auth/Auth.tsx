import React from 'react';
import './auth.css';
import Login from './Login';
import Signup from './Signup';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';

import loginImg from '../../Assets/Meme Pic.jpg';
import signinImg from '../../Assets/Login Pic.jpg';

type AuthState = {
  isLogin: boolean,
}

type AuthProps = {
  updateToken: (newToken: string) => void,
  updateUsername: (username: string) => void,
  updateUserRole: (role: string) => void
}

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props)

    this.state = {
      isLogin: true
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm='1'></Col>
          <Col sm='5'>
            <div>
              <h2 style={{ color: 'white', textAlign: 'center' }}>{this.state.isLogin ? "Login" : "Create an Account"}</h2>
              {
                this.state.isLogin ?
                  <Login updateToken={this.props.updateToken} updateUsername={this.props.updateUsername} updateUserRole={this.props.updateUserRole} />
                  : <Signup updateToken={this.props.updateToken} updateUsername={this.props.updateUsername} updateUserRole={this.props.updateUserRole} />
              }
              <br />
              <Button onClick={() => this.setState({ isLogin: !this.state.isLogin })}>
                {this.state.isLogin ? "Don't have an account?" : 'Already have an account?'}
              </Button>
            </div>
          </Col>
          <Col sm='5'>
            <div style={{ padding: 30, display: 'flex', height: '100%', width: '100%' }}>
              <img style={{ alignContent: 'center', justifyContent: 'center', borderRadius: '5%' }} src={this.state.isLogin ? loginImg : signinImg} alt="auth pic" />
            </div>
          </Col>
          <Col sm='1'></Col>
        </Row>
      </Container>
    )
  }

}

export default Auth;