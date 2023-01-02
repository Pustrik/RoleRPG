import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {changeUserData} from "../../../server/services/user-service";
import {useNavigate} from "react-router";

const ChangeUserDataForm: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password_d, setPasswordD] = useState<string>('');
    const [password_old, setPasswordOld] = useState<string>('');
    const [class_id, setClassId] = useState<number>(0);
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const Nav = () => {
        navigate('/');
    }
    return (
        <div>
            <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                type={"text"}
                placeholder={"новый юзернейм"}
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type={"text"}
                placeholder={"новый пароль"}
            />
            <input
                onChange={e => setPasswordD(e.target.value)}
                value={password_d}
                type={"text"}
                placeholder={"снова новый пароль"}
            />
            <input
                onChange={e => setPasswordOld(e.target.value)}
                value={password_old}
                type={"text"}
                placeholder={"старый пароль"}
            />
            <label><input type="radio" checked={class_id === 0} onChange={() => setClassId(0)}/>Warrior</label>
            <label><input type="radio" checked={class_id === 1} onChange={() => setClassId(1)}/>Mage</label>
            <label><input type="radio" checked={class_id === 2} onChange={() => setClassId(2)}/>Thief</label>
            <button onClick={() => store.changeUserData(username, password, password_d, password_old, class_id)}>Подтвердить изменения</button>
            <button onClick={Nav}>Назад</button>

        </div>
    );
};

export default observer(ChangeUserDataForm);