import {UserApi} from "src/api/user-api";
import {store} from "src/Storage/store";

class UserController {
  search(login: string) {
        return UserApi.search({ login }).then((res)=>{
          console.log("res", res)
          if(res.length!==0){
            store.set('contacts', res);
          }


        });
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
