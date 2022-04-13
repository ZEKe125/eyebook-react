import './App.css';
import React, { 
  // useState, 
  // useEffect
} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  // Route, 
  Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Gazer Project - Debug</h1>
      <p>User should not be able to see this page!</p>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">Login</Link> |{" "}
        <Link to="/MainMenu">Main-Menu</Link> |{" "}
        <Link to="/GazeApp">GazeApp</Link>
      </nav>
    </div>
  );
}

export default App;