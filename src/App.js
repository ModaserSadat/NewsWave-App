import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';

import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
apiKey=process.env.REACT_APP_NEWS_API;
state ={
  progress:0
}
setProgress = (progress) =>{
  this.setState({ progress: progress })
}
  render() {
    return (
      <div>
        <Router>
          <Navbar />

          <LoadingBar color='#f11946' progress={this.state.progress} height={3}/>

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' country='in' pageSize={20} category='general' />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='technology' country='in' pageSize={20} category='technology' />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='business' country='in' pageSize={20} category='business' />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' country='in' pageSize={20} category='entertainment' />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' country='in' pageSize={20} category='health' />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' country='in' pageSize={20} category='sports' />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' country='in' pageSize={20} category='science' />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
