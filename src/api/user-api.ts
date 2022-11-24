

import {http} from "src/modules/HttpTransport";

class Api {
    search(data: { login: string }) {
                return http
            .post('/user/search', {
                data,
            })
            .then((res) => {
                const responseData = JSON.parse(res.response);

                return responseData.map(
                    (item) => ({
                        email: item.email,
                        login: item.login,
                        displayName: item.display_name,
                        secondName: item.second_name,
                        avatar: item.avatar,
                        phone: item.phone,
                        id: item.id,
                        firstName: item.first_name,
                    })
                );
            });
    }

    changeProfile(data) {

        const dataRequest = {
            first_name: data.first_name,
            second_name: data.second_name,
            display_name: data.display_name || '',
            login: data.login,
            email: data.email,
            phone: data.phone,
        };
         console.log("dataRequest", dataRequest)
        return http
            .put('/user/profile', {
                data: dataRequest,
            })
            .then((res) => {
                const responseData = JSON.parse(res.response);

                return {
                    id: responseData.id,
                    firstName: responseData.first_name,
                    secondName: responseData.second_name,
                    displayName: responseData.display_name,
                    login: responseData.login,
                    email: responseData.email,
                    phone: responseData.phone,
                    avatar: responseData.avatar,
                };
            });
    }

    changeAvatar(file: File) {
        return http
            .put('/profile/avatar', {
                data: file,
            })
            .then((res) => {
                const responseData = JSON.parse(res.response);

                return {
                    id: responseData.id,
                    firstName: responseData.first_name,
                    secondName: responseData.second_name,
                    displayName: responseData.display_name,
                    login: responseData.login,
                    email: responseData.email,
                    phone: responseData.phone,
                    avatar: responseData.avatar,
                };
            });
    }
}

export const UserApi = new Api();
