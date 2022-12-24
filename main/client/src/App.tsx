import React, {useContext, useEffect, useRef, useState} from 'react';
import LoginForm from "./components/login_form";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {IUser} from "./models/i_user";
import UserService from "./services/user_service";
import RegistrationForm from "./components/registration_form";
import ChangeUserDataForm from "./components/change_form";
import SocketIOClient from 'socket.io-client'
import Lobby_page from "./components/lobby_page";
import {useNavigate} from "react-router";
import Store_socket from "./store/store_socket";
const App = () => {
    const {socket} = useContext(Store_socket).SocketState;

    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        socket?.disconnect();
    },[]);
    useEffect(() => {
        if(localStorage.getItem('token'))
            store.checkAuth();
    }, []);
    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
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
            <div>
                <button onClick={() => getUsers()}>Пользователи</button>
            </div>
            <h1>{store.is_auth ? `Пользователь фаторизован  ${store.user.username}` : `Авторизуйтесь`}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={() => getUsers()}>Пользователи</button>
            </div>
            {users.map(user =>
                <div key={user.username}>{user.username}<button>Атака</button><button>Способность</button></div>
            )}
            <button onClick={Nav}>В лобби</button>
            <button onClick={NavChange}>Изменить данные</button>

        </div>
    );

};


export default observer(App);
