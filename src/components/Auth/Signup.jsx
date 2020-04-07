import React from 'react';
import './style.scss'
import loginImg from '../../Assets/Login Pic.jpg';

export class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: ""
        }

        handleSubmit = (e) => {
            e.preventDefault();

            const bodyObj = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            } 
        
            fetch('https://team6-red-badge-meme-server.herokuapp.com/user/signup', {
                method: 'POST',
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
            // .then(json => props.setSession(json.sessionToken));
            })

    render() {
        return (
        <div className="base-container" ref={this.props.containerRef}>>
            <form onSubmit={handleSubmit}>
            <div className="header">Signup</div>
            <br/>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="login"/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={this.setState({ email: e.target.value })} type="text" name="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.setState({ email: e.target.value })} type="text" name="email" placeholder="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.setState({ password: e.target.value })} type="password" name="password" placeholder="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn">Signup</button>
            </div>
            </form>
        </div>
        )
    }
}
}
}
