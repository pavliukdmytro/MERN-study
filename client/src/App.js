import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes';
import {UserAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/Auth.Context";
import {Navbar} from "./components/Navbar";
import 'materialize-css';

function App() {
    const {token, login, logOut, userId} = UserAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{token, login, logOut, userId}}>
            <Router>
                { isAuthenticated && <Navbar />}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
