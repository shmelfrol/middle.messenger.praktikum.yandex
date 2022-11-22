import {UserApi} from "src/api/user-api";
import {store} from "src/Storage/store";

class UserController {
  search(login: string) {
    return UserApi.search({ login });
  }

  changeProfile(data) {
    return UserApi.changeProfile(data).then((user) => {
      store.set('currentUser', user);
    });
  }

  changeAvatar(file: File) {
    return UserApi.changeAvatar(file).then((user) => {
      store.set('currentUser', user);
      return user;
    });
  }
}

export const UserCtr = new UserController();
