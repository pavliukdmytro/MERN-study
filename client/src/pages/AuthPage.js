import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from "../context/Auth.Context";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);
    
    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    };
    
    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register',
                'POST', {...form}, {'Content-Type': 'application/json'});
            console.log('data', data);
        } catch (err) {}
    };
    
    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login',
                'POST', {...form}, {'Content-Type': 'application/json'});
            auth.login(data.token, data.userId)
        } catch (err) {}
    };

    return (
        <div className="row">
            <h1>Auth Page</h1>
            <div className="col s6 offset-s3">
                <h1>Сократи Ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите password"
                                    id="Password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="Password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: '10px'}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey black-text"
                            disabled={loading}
                            onClick={registerHandler}
                        >Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

