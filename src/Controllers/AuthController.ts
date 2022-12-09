import {router} from "src/modules/MainRouter";
import {authapi} from "src/api/auth-api";
import {store} from "src/Storage/store";
import {STORE_ITEM} from "src/Storage/store";

// TODO: для всех запросов во всех контроллерах добавить catch c обработкой ошибок
class AuthController {
    signUp(data) {
        return authapi.signUp(data).then(res => {
            if (res?.id) {
                this.getUser().then((res) => {
                    if (res?.id) {
                        router.go("/messenger")
                    }
                })
            }
        }).catch(res => {
            throw res
        });
    }

    signIn(data) {
        return authapi.signIn(data).then((res) => {
            if (res == "OK") {
                this.getUser().then((res) => {
                    if (res?.id) {
                        router.go("/messenger")
                    }
                })

            }
        }).catch((res) => {
            if (res?.reason) {
                if (res.reason === "User already in system") {
                    router.go("/messenger")
                }
            }

            throw res
        })
    }

    logout() {
        return authapi.logout().then((res) => {
            if (res == "OK") {
                localStorage.removeItem(STORE_ITEM);
            }
            window.location.reload();
            return res
        });
    }

    async getUser() {
        const currentUser = store.getState().currentUser;

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
