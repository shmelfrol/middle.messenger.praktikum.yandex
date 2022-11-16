import {validEl} from 'src/utility/valid';

function InputEvents(el: HTMLDivElement) {
    console.log('from props');
    const errordiv = el.querySelector('#errormessage');
    if (errordiv) {
        const inputs = el.querySelectorAll('input');
        if (inputs) {
            inputs.forEach((item) => {
                item.addEventListener('blur', () => {
                    validEl(item, errordiv);
                });
            });
        }
    }
}

export const formsdata = {
    inputs: {
        first_name: {
            inputname: 'first_name',
            text: 'Имя',
            type: 'text',
            events: InputEvents,
        },
        second_name: {
            inputname: 'second_name',
            text: 'Фамилия',
            type: 'text',
            events: InputEvents,
        },
        display_name: {
            inputname: 'display_name',
            text: 'Отображаемое имя',
            type: 'text',
            events: InputEvents,
        },
        login: {
            inputname: 'login',
            text: 'Логин',
            type: 'text',
            events: InputEvents,
        },
        email: {
            inputname: 'email',
            text: 'Email',
            type: 'email',
            events: InputEvents,
        },
        phone: {
            inputname: 'phone',
            text: 'Тел',
            type: 'text',
            events: InputEvents,
        },
        oldPassword: {
            inputname: 'oldPassword',
            text: 'oldPassword',
            type: 'password',
            events: InputEvents,
        },
        newPassword: {
            inputname: 'newPassword',
            text: 'newPassword',
            type: 'password',
            events: InputEvents,
        },
        Password: {
            inputname: 'Password',
            text: 'пароль',
            type: 'password',
            events: InputEvents,
        },
        avatar: {
            inputname: 'avatar',
            text: 'Фото',
            type: 'file',
            events: InputEvents,
        },
    },
    buttons: {
        btnLogin: {btn_name: "LogIn"},
        btnReg: {btn_name: "SignIn"},
        btnSettings: {btn_name: "Save"}
    }
};


export const formfields = {
    LoginFields: ['login', 'Password', 'button_login'],
    RegFields: [
        'first_name',
        'second_name',
        'display_name',
        'email',
        'phone',
        'login',
        'Password',
        'button_login',
    ],
    SettingsFields: [
        'first_name',
        'second_name',
        'display_name',
        'email',
        'phone',
        'login',
        'oldPassword',
        'newPassword',
        'avatar',
        'button_login',
    ]
}
