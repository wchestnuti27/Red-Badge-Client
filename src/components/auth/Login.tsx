import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

type LoginState = {
    username: string,
    password: string
}

type LoginProps = {
    updateToken: (newToken: string) => void,
    updateUsername: (username: string) => void,
    updateUserRole: (role: string) => void
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.username !== '' && this.state.password !== '') {
            fetch('https://team6-red-badge-meme-server.herokuapp.com/user/login', {
                method: 'POST',
                body: JSON.stringify({ username: this.state.username, password: this.state.password }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(response => response.json()
            ).then(data => {
                data.user ? this.props.updateUsername(data.user.username) : console.log('could not update user')
                data.user ? this.props.updateUserRole(data.user.role) : console.log('no user role assigned')
                data.sessionToken ? this.props.updateToken(data.sessionToken)
                    : alert(`${data.error}: Username or Password Not Found`)
            })
        } else { alert('Please fill out all fields') }
    }

    render() {
        return (
            <div>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <FormGroup>
                        <Label htmlFor='username'>Username:</Label>
                        <Input id='username' value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password:</Label>
                        <Input id='password' type='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}></Input>
                    </FormGroup>
                    <Button type='submit' color='info'>Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login;