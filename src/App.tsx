import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar/Navbar';

import './components/auth/style.scss'

document.title = 'SupreMemes';

type AppState = {
  sessionToken: string | null,
  username: string | null,
  userRole: string | null
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)

    this.state = {
      sessionToken: "",
      username: '',
      userRole: 'guest',
    }
  }


  updateToken(newToken: string) {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: localStorage.getItem('token') })
  }

  clearToken() {
    localStorage.clear();
    this.setState({
      sessionToken: '',
      username: '',
      userRole: 'guest'
    });
  }

  updateUsername(username: string) {
    localStorage.setItem('username', username);
    this.setState({ username: username });
  }

  updateUserRole(role: string) {
    localStorage.setItem('userRole', role);
    this.setState({ userRole: role });
  }

  componentDidMount() {
    this.setState({
      sessionToken: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      userRole: localStorage.getItem('userRole')
    })
  }

  render() {

    return (
      <div style={{ backgroundColor: 'rgb(33,33,33)', color: 'white' }}>
        <Router>
          <Navbar
            sessionToken={this.state.sessionToken}
            updateToken={this.updateToken.bind(this)}
            clearToken={this.clearToken.bind(this)}
            username={this.state.username}
            updateUsername={this.updateUsername.bind(this)}
            userRole={this.state.userRole}
            updateUserRole={this.updateUserRole.bind(this)}
          />
        </Router>
      </div>
    )
  }

}

export default App;