import React from 'react'
import{BrowserRouter,Route, Routes} from 'react-router-dom'
import {makeStyles} from '@material-ui/core'
import Header from './Components/Headers'
import HomePage from './Pages/HomePage'
import CoinsPage from './Pages/CoinsPage'

const useStyles = makeStyles(()=>({
  App: {
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh",

  },
}));
function App() {

const classes = useStyles();
  
  return (
   <BrowserRouter>
   <div className={classes.App}>
     <Header/>
     <Routes>

     <Route path={'/'} element={<HomePage/>} />
     <Route path={'/coins/:id'} element={<CoinsPage/>}/>
     </Routes>

   </div>
   
   </BrowserRouter>
  )
}

export default App
