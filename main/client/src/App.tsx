import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./components/login-form";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {IUser} from "./models/i-user";
import RegistrationForm from "./components/registration-form";
import {useNavigate} from "react-router";
import StoreSocket from "./store/store-socket";
const App = () => {
    const {socket} = useContext(StoreSocket).SocketState;

    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        socket?.disconnect();
    },[]);
    useEffect(() => {
        if(localStorage.getItem('token'))
            store.checkAuth();
    }, []);

    const navigate = useNavigate();
    if(store.is_loading) {
        return <div>Loading...</div>
    }
    if(!store.is_auth){
        return (
        <div>
            <LoginForm/>
            <RegistrationForm/>
        </div>
        )
    }
    const Nav = () => {
            navigate('/lobby');
        }
    const NavChange = () => {
        navigate('/change');
    }

    return (
        <div>
            <h1>{store.is_auth ? `Пользователь фаторизован  ${store.user.username}` : `Авторизуйтесь`}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            {users.map(user =>
                <div key={user.username}>{user.username}<button>Атака</button><button>Способность</button></div>
            )}
            <button onClick={Nav}>В лобби</button>
            <button onClick={NavChange}>Изменить данные</button>

        </div>
    );

};


export default observer(App);
