import { UserApi } from 'src/api/user-api';
import { store } from 'src/Storage/store';
import { TChangeProfileRequest } from 'src/type_component';

class UserController {
  search(login: string) {
    return UserApi.search({ login })
      .then((res) => res)
      .catch((res) => res);
  }

  changeProfile(data: TChangeProfileRequest) {
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
