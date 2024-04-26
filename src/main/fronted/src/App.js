import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import App1 from './components/start.js';
import App2 from './components/membership.js';
import App3 from './components/login.js';
import App4 from './components/academy.js';
import App5 from './components/afterlogin.js';
import App6 from './components/main.js';
import Test from './components/test.js';
import App7 from './components/academy_register.js';
import App8 from './components/findID.js';
import App9 from './components/findPW.js';
import App10 from './components/notice.js';
import { Component } from 'react';

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      
    }
  }

  render(){
    return(
      <div id='App'>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<App1/>}/>
              <Route path='/membership' element={<App2/>}/>
              <Route path='/login' element={<App3/>}/>
              <Route path='/academy' element={<App4/>}/>
              <Route path='/afterlogin' element={<App5/>}/>
              <Route path='/main' element={<App6/>}/>
              <Route path='/test' element={<Test/>}/>
              <Route path='/academyform' element={<App7/>}/>
              <Route path='/findID' element={<App8/>}/>
              <Route path='/findPW' element={<App9/>}/>
              <Route path='/notice' element={<App10/>}/>
            </Routes>   
        </BrowserRouter> 
      </div>
    )
  }
}

export default App;
