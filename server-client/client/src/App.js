import React from 'react'

 
import './App.css'
import {Spinner,ShelfContainer,SizeFilter,FloatCart} from "./components"


function App(props) {
  
  return (
    <div className="App">
      <Spinner/>
      <SizeFilter/>
      <ShelfContainer />
      <FloatCart/>
    </div>
  )
}

export default App
