import {http} from "src/modules/HttpTransport";
import {TSignUpRequest} from "src/type_component";


// TODO: пройтись по проекту и проверить, что название файлов соответствует названию класса
class AuthApi {
    signUp(data:TSignUpRequest) {
        const requestData = {
            first_name: data.first_name,
            second_name: data.second_name,
            login: data.login,
            email: data.email,
            password: data.password,
            phone: data.phone,
        };

        return http
            .post('/auth/signup', {
                data: requestData,
            })
            .then((res): { id: number } => JSON.parse(res.response));
    }

    signIn(data:TSignUpRequest) {
        return http.post('/auth/signin', {data}).then((res): 'OK' => {
            return res.response
        }).catch(res => {
            throw res
        });
    }

    logout() {
        return http.post('/auth/logout').then((res): 'OK' => res.response);
    }

    getUser() {
        return http.get('/auth/user').then((res) => {
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

export const authapi = new AuthApi();
