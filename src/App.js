import './App.css';
import React, { Component, useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () =>  {
const apiKey=process.env.REACT_APP_NEWS_API;
const [progress, setProgress] = useState(0)
  
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color='#f11946' progress={progress} height={3}/>
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' country='in' pageSize={20} category='general' />} />
            <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey}  key='technology' country='in' pageSize={20} category='technology' />} />
            <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey}  key='business' country='in' pageSize={20} category='business' />} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' country='in' pageSize={20} category='entertainment' />} />
            <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' country='in' pageSize={20} category='health' />} />
            <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' country='in' pageSize={20} category='sports' />} />
            <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' country='in' pageSize={20} category='science' />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </Router>
      </div>
    );
 
}
export default App;