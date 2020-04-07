import React from 'react';
import './style.scss'
import '../../helpers/environment';
import APIURL from '../../helpers/environment';
import loginImg from '../../Assets/Login Pic.jpg'; 

export class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }


    handleSubmit(event) {
        event.preventDefault();

            fetch('https://team6-red-badge-meme-server.herokuapp.com/user/signup', {
                method: 'POST',
                body: JSON.stringify({ username: this.state.username, email: this.state.email, password: this.state.password, role: "user" }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(
                (response) => response.json()
            ).then((data) => {
                console.log(data)
                this.props.updateToken(data.sessionToken)
                    // : alert(`${data.error}: Username or Password Not Found`)
            })
    }


    render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Signup</div>
            <br/>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="login"/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={e => this.setState({ username: e.target.value })} type="text" name="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => this.setState({ email: e.target.value })} type="email" name="email" placeholder="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={e => this.setState({ password: e.target.value })} type="password" name="password" placeholder="password" />
                    </div>
                </div>
            </div>
            <div className="footer">
            <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn">Signup</button>
            </div>
        </div>
    }
}

// export default Signup;