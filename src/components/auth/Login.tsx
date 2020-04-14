import React from 'react';
// import './style.scss'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import loginImg from '../../Assets/Meme Pic.jpg';

type LoginState = {
    username: string,
    password: string
}

type LoginProps = {
    updateToken: (newToken: string) => void,
    updateUsername: (username: string) => void
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
                console.log(data);
                data.user ? this.props.updateUsername(data.user.username) : console.log('could not update user')
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




// import React from 'react';
// import './Auth.css';



// const Auth = (props) => {
//     // console.log('props:', props);

//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword]= useState('');
//     const [login, setLogin] = useState(true);

//     const title = () => {
//         return login ? 'Login' : 'Signup';
//     }

//     const loginToggle = (event) => {
//         event.preventDefault();
//         setLogin(!login);
//         setUsername('');
//         setEmail('');
//         setPassword('');
//     }

//         const handleSubmit = (e) => {
//             e.preventDefault();

//             const url = login ? 'https://team6-red-badge-meme-server.herokuapp.com/user/login' : 'https://team6-red-badge-meme-server.herokuapp.com/user/signup';

//             const bodyObj = {
//                 username: username,
//                 email: email,
//                 password: password
//             } 

//             fetch(url, {
//                 method: 'POST',
//                 body: JSON.stringify(bodyObj),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(res => res.json())
//             .then(json => {
//                 console.log(json)
//             // .then(json => props.setSession(json.sessionToken));
//             })
//         }

//     render () {   
//         return (
//             <div>
//             <form onSubmit={handleSubmit}>
//                 <h1>{title()}</h1>
//                 <label htmlFor='username'>Username:</label>
//                 <br/>
//                 <input type='text' id='username' value={username} onChange={ (e) => setUsername(e.target.value) } />
//                 <br/>
//                 <label htmlFor='email'>Email:</label>
//                 <br/>
//                 <input type='email' id='email' value={email} onChange={ (e) => setEmail(e.target.value) } />
//                 <br/>
//                 <label htmlFor='password'>Password:</label>
//                 <br/>
//                 <input type='password' id='password' value={password} onChange={ (e) => setPassword(e.target.value) } />
//                 <br/>
//                 <br/>
//                 <button onClick={loginToggle}>Login/Signup Toggle</button>
//                 <br/>
//                 <button type='submit'>Submit</button>
//             </form>
//         </div>
//     )
// }
// }

// export default Auth;