import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Detail from './components/Detail Card/Detail';
import Landing from './components/Landing/Landing'
import styles from './App.module.css'
import FormActivity from './components/Activity/FormActivity';

function App() {
  return (
    <div className={styles.App}>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/countries' element={<Home/>}/>
      <Route path='/countries/:id' element={<Detail/>} />
      <Route path='/activities' element={<FormActivity />} />
    </Routes>
      
      {/*<Route path='/activities/form' element={<ActivityForm />} />
      <Route path='/activities' element={<Activities />} /> */}
      
    </div>
  )
}

export default App;
