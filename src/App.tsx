import React from 'react';
import './App.scss';

import Auth from './components/auth/Auth';
import Feed from './components/CRUD/Feed/Feed';
import './components/auth/style.scss'

document.title = 'SupreMemes';


class App extends React.Component {

  componentWillMount() {
    console.log('hi,')
  }

  componentDidMount() {
    console.log('how are ya?')
  }


  render() {
    return (
      // <h1>is this working</h1>
      // <Auth />
      <Feed />
    )
  }

}

export default App;