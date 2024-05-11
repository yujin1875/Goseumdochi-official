import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import App1 from './components/start.js';
import App2 from './components/membership.js';
import App3 from './components/login.js';
import App4 from './components/academy.js';
import App5 from './components/afterlogin.js';
import App6 from './components/main.js';
import AcademyForm from './components/academyForm.js';
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
              <Route path='/academyForm' element={<AcademyForm/>}/>
            </Routes>
        </BrowserRouter> 
      </div>
    )
  }
}

export default App;
