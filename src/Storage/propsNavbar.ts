import {store} from "src/Storage/store";


export function getMenuItens(){
    let currentUser=store.getState().currentUser
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

