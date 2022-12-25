import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {changeUserData} from "../../../server/services/user_service";
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
            <button value={class_id} onClick={(e) => setClassId(0)}>Warrior</button>
            <button value={class_id} onClick={(e) => setClassId(1)}>Mage</button>
            <button value={class_id} onClick={(e) => setClassId(2)}>Thief</button>
            <button onClick={() => store.changeUserData(username, password, password_d, password_old, class_id)}>Подтвердить изменения</button>
            <button onClick={Nav}>Назад</button>

        </div>
    );
};

export default observer(ChangeUserDataForm);