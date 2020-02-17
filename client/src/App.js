import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes';
import 'materialize-css';


function App() {
    const routes = useRoutes(true);
  return (
    <div className="container">
        <Router>
            {routes}
        </Router>
    </div>
  );
}

export default App;
