import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes';
import {UserAuth} from "./hooks/auth.hook";
import 'materialize-css';
import {AuthContext} from "./context/Auth.Context";


function App() {
    const {token, login, logout, userId} = UserAuth();
    const isAuthenticated = !!token;
    console.log('isAuthenticated:', isAuthenticated);
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{token, login, logout, userId}}>
            <div className="container">
                <Router>
                    {routes}
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
