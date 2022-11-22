import { http } from "src/modules/HttpTransport";


export function authreg(data){

    let requestData={data:data}
    console.log("EEEEEEEEEE",requestData)
    http.post("/auth/signup",requestData)
        .then((res): { id: number } => JSON.parse(res.response));



}

export function logout(){
http.post('/auth/logout').then((res): 'OK' => res.response);

}

export function login(data){
    http.post('/auth/signin', { data }).then((res): 'OK' => res.response);
}