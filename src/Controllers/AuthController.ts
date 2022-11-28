import {router} from "src/modules/MainRouter";
import {authapi} from "src/api/auth-api";
import {store} from "src/Storage/store";
import {STORE_ITEM} from "src/Storage/store";

// TODO: для всех запросов во всех контроллерах добавить catch c обработкой ошибок
class AuthController {
    signUp(data) {
        return authapi.signUp(data);
    }

    signIn(data) {
       // debugger
        return authapi.signIn(data).then((res) => res)

    }

    logout() {
        //debugger
        //удаляем запись о пользователе из localsstorage
        //localStorage.removeItem(STORE_ITEM);

        return authapi.logout().then((res) => {
            console.log("RESSSSSSSSSS", res)
            if(res=="OK"){
                localStorage.removeItem(STORE_ITEM);
            }
            console.log("localStorage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", localStorage)


            //перезагружаем страничку чтобы начать занаво И ОБНУЛИТЬ STORE
            //router.go("/login")
            window.location.reload();
        });
    }

    async getUser() {
        //помещаем в currentUser из state
        //debugger
       // console.log("GetUser store", store)
        const currentUser = store.getState().currentUser;
        //console.log("get_currentUser", currentUser)
        if (currentUser?.id) {
            return currentUser;
        }
        return authapi.getUser().then((user) => {
            store.set('currentUser', user);
            return user;
        });
    }
}

export const AuthCtr = new AuthController();