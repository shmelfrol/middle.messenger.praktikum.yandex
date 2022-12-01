import {AuthCtr} from "src/Controllers/AuthController";
import {store} from "src/Storage/store";

export const menuitems: object = [
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
]

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

export function getMenuItens(){
    let currentUser=store.getState().currentUser
   console.log("currentUser",store.getState())
    if (currentUser?.id) {
        return {
            menuitems: [
                {
                    id: 0,
                    name: '/messenger',
                    path: '/messenger',
                    title: 'Чат',
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
                    name: '/logout',
                    title: 'Выйти',
                    active: false,
                },
            ]
        }
    }else{
        return {
            menuitems: [
                {
                    id: 2,
                    name: '/',
                    title: 'Вход',
                    active: false,
                },
                {
                    id: 3,
                    name: '/sign-up',
                    title: 'Регистрация',
                    active: false,
                },
            ]
        }
    }




}

