import React from 'react';
import { WebGazeContext } from './WebGazeContext';
import './Main.css';
import  Book  from './book';

function MainApp(){



   
    return (

      <div id="container">
        <h1>New EyeBook Reader</h1>
        <h2>the revolution has begun</h2>
        <WebGazeContext.Consumer>
          {value => (<div>{value.x} {value.y}</div>)}
        </WebGazeContext.Consumer>
        <Book/>


      </div>
    );
  };


export default MainApp;
