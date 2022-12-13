import {isValidLogin, isValidRegistration} from "../user_validation/user_validation";
import {Mage} from "../entityes/mage";
import {Thief} from "../entityes/thief";
import {Warrior} from "../entityes/warrior";


export function loginPost(req, res) {
    const is_valid = isValidLogin();
    console.log(req.body);
    res.status(200).json({
        login: {
            login: req.body.login,
            password: req.body.password
        }
    })
}
export function loginGet(req, res) {
    res.sendFile(__dirname + '/login.html');
}
export function registrationPost(req, res) {
    const is_valid = isValidLogin();
    console.log(req.body);
    res.status(200).json({
        login: {
            login: req.body.login,
            password: req.body.password
        }
    })
}
export function registrationGet(req, res) {
    res.sendFile(__dirname + '/registration.html');
}
