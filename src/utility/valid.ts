import {MyvalidateFields} from "./myvalidate";

export function validform(el:HTMLDivElement, values:{[key: string]:any}, event:any){
    event.preventDefault()
    el.querySelectorAll('input').forEach((item)=> {
        if(item.type!=='submit'){values[item.name] = item.value}
    })
    let err=null
    for(let key in values){
        let error=MyvalidateFields(key, values[key])
        if(error!==null){err=error}
        if(key=='newPassword'){
            if(values[key]!==values['oldPassword']){
                err="старый и новый пароли не совпадают"
            }
        }
    }
    if(err==null){
        console.log(values)
    }else{console.log(err)}
}

export function validEl(item:HTMLInputElement, errordiv:Element){
    let error=MyvalidateFields(item.name, item.value)
    console.log(error)
    if(error!=null){
        item.classList.add('errorinput');
        errordiv.innerHTML=error
    }else{
        item.classList.remove("errorinput");
        errordiv.innerHTML=''
    }
}