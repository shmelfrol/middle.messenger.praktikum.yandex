export function form(fields) {
    console.log(fields);
    let inputs=[
        {inputname:'first_name', text: 'Имя', type: 'text'},
        {inputname:'second_name', text: 'Фамилия', type: 'text'},
        {inputname:'display_name', text: 'Отображаемое имя', type: 'text'},
        {inputname:'login', text: 'Логин', type: 'text'},
        {inputname:'email', text: 'Email', type: 'email'},
        {inputname:'phone', text: 'Тел', type: 'text'},
        {inputname:'oldPassword', text: 'oldPassword', type: 'password'},
        {inputname:'newPassword', text: 'newPassword', type: 'password'},
        {inputname:'Password', text: 'пароль', type: 'password'},
        {inputname:'avatar', text: 'Фото', type: 'file'},
]
let arr=[];
    fields.forEach(field=>{
        console.log(field);
        for(let i=0; i<inputs.length; i++){
            if(inputs[i].inputname==field){
                //arr=[...arr, inputs[i] ]
                arr.push(inputs[i]);
            }

        }
    })

    return arr;
}