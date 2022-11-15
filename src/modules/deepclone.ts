type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge11(lhs: Indexed, rhs: Indexed): Indexed {
//если оба объекты
    if (((typeof rhs) === "object") && ((typeof lhs) === "object")) {
        // перебираем левый
        for (let i in rhs) {
            //если свойство объект
            if ((typeof rhs[i]) === "object") {
                //если нет такого свойство у правого создаем пустое
                if (!lhs[i]) Object.assign(lhs, {
                    [i]: {}
                });
                //
                merge11(lhs[i] as Indexed, rhs[i] as Indexed);
            } else {
                Object.assign(lhs, {
                    [i]: rhs[i]
                });
            }
        }
    }
    console.log("lhs", lhs)
    return lhs
}

function cloneDeep<T extends object = object>(obj: T) {
    let result: Array<Indexed> = []
    if (Array.isArray(obj)) {
        obj.forEach((item) => {
            let newitem = {};
            merge11(newitem as Indexed, item as Indexed);
            result.push(newitem)
        })
    }
    console.log("result", result)
    return result
}


const objects = [{'a': 3, v: {h: 2}}, {'b': 2, c: 2}];
const deep = cloneDeep(objects);

console.log(objects[0].v);
console.log(deep[0].v);


console.log("analize", deep[0].v === objects[0].v); // => false