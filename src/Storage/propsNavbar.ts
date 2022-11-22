export const menuitems: object = {
    chat: {
        id: 0,
        name: '/chat',
        path: '/chat',
        title: 'Чат',
        active: false,
    },
    contacts: {
        id: 1,
        name: '/contacts',
        title: 'Контакты',
        active: false,
    },
    login: {
        id: 2,
        name: '/login',
        title: 'Вход',
        active: false,
    },
    settings: {
        id: 3,
        name: '/settings',
        title: 'Настройки',
        active: false,
    },
    reg: {
        id: 3,
        name: '/reg',
        title: 'Регистрация',
        active: false,
    },
};

export const navitems: object = {
    menuitems: [
        {
            id: 0,
            name: '/chat',
            path: '/chat',
            title: 'Чат',
            active: false,
        },
        {
            id: 1,
            name: '/contacts',
            title: 'Контакты',
            active: false,
        },
        {
            id: 2,
            name: '/login',
            title: 'Вход',
            active: false,
        },
        {
            id: 3,
            name: '/settings',
            title: 'Настройки',
            active: false,
        },
        {
            id: 3,
            name: '/reg',
            title: 'Регистрация',
            active: false,
        },
        {
            id: 3,
            name: '/logout',
            title: 'Выйти',
            active: false,
        },
    ]
}