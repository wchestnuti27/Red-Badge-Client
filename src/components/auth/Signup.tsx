import React from 'react';
// import './style.scss'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import loginImg from '../../Assets/Login Pic.jpg';

type SignupState = {
    username: string,
    email: string,
    password: string
}

type SignupProps = {
    updateToken: (newToken: string) => void,
    updateUsername: (username: string) => void
}

class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.username !== '' && this.state.email !== '' && this.state.password !== '') {
            fetch('https://team6-red-badge-meme-server.herokuapp.com/user/signup', {
                method: 'POST',
                body: JSON.stringify({ username: this.state.username, email: this.state.email, password: this.state.password, role: "user" }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(response => response.json()
            ).then(data => {
                console.log(data);
                data.user ? this.props.updateUsername(data.user.username) : console.log('could not update user')
                data.sessionToken ? this.props.updateToken(data.sessionToken)
                    : alert(data.errors[0].message) //data.errors[0].message
            })
        } else { alert('Please fill out all fields') }
    }


    render() {
        return (
            <div>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <FormGroup>
                        <Label htmlFor='username'>Username:</Label>
                        <Input id='username' onChange={e => this.setState({ username: e.target.value })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='email'>Email:</Label>
                        <Input id='email' onChange={e => this.setState({ email: e.target.value })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password:</Label>
                        <Input id='password' type='password' onChange={e => this.setState({ password: e.target.value })}></Input>
                    </FormGroup>
                    <Button type='submit' color='info'>Create Account</Button>
                </Form>
            </div>
        )


    }
}

export default Signup;




        // return <div className="base-container">
        //     <div className="header">Signup</div>
        //     <br />
        //     <div className="content">
        //         <div className="image">
        //             <img src={loginImg} alt="login" />
        //         </div>
        //         <div className="form">
        //             <div className="form-group">
        //                 <label htmlFor="username">Username</label>
        //                 <input onChange={e => this.setState({ username: e.target.value })} type="text" name="username" placeholder="username" />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="email">Email</label>
        //                 <input onChange={e => this.setState({ email: e.target.value })} type="email" name="email" placeholder="email" />
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor="password">Password</label>
        //                 <input onChange={e => this.setState({ password: e.target.value })} type="password" name="password" placeholder="password" />
        //             </div>
        //         </div>
        //     </div>
        //     <div className="footer">
        //         <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Signup</button>
        //     </div>
        // </div>