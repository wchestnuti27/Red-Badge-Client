import React from 'react';
import './style.scss'
import '../../helpers/environment';
import APIURL from '../../helpers/environment';
import loginImg from '../../Assets/Login Pic.jpg';

export class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <br/>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="login" />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" placeholder="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">Login</button>
            </div>
        </div>
    }
}






















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