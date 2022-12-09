import {MyvalidateFields} from './myvalidate';

export function validform(el: HTMLDivElement) {
    const values = {};
    //event.preventDefault();
    el.querySelectorAll('input').forEach((item) => {
        if (item.type !== 'submit') {
            if (item.value) {
                values[item.name] = item.value;
            }
        }
    });
    let err = null;
    console.log("VALUES", values)
    for (const key in values) {
        const error = MyvalidateFields(key, values[key]);
        if (error !== null) {
            err = error;
        }
        if (key === 'newPassword') {
            if (values[key] !== values.oldPassword) {
                err = 'старый и новый пароли не совпадают';
            }
        }
    }
    if (err == null) {
        console.log(values)
        return values
    } else {
        throw new Error(err)
    }
}

export function validformData(values) {
    let err = null;
    if(Object.keys(values).length!==0){
        for (const key in values) {
            const error = MyvalidateFields(key, values[key]);
            if (error !== null) {
                err = error;
            }
            if (key === 'newPassword') {
                if (values[key] !== values.oldPassword) {
                    err = 'старый и новый пароли не совпадают';
                }
            }
        }
    }
    return err
}





export function validEl(item: HTMLInputElement, errordiv: Element) {
    const error = MyvalidateFields(item.name, item.value);
    if (error != null) {
        item.classList.add('errorinput');
        errordiv.innerHTML = error;
    } else {
        item.classList.remove('errorinput');
        errordiv.innerHTML = '';
    }
}
