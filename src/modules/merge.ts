/*type Indexed<T = unknown> = {
    [key in string]: T;
};*/

function KeyIsObject(obj: Indexed) {
    if ((typeof obj) === 'object') {
        for (let k in obj) {
            if ((typeof obj[k]) === "object") {
                return true
            }
        }
    }

    return false
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    let result: Indexed = {};
    for (let o in rhs) {
        if ((typeof rhs[o]) === "object") {
            if ((typeof lhs[o]) === "object") {
                if (KeyIsObject(rhs[o]) && KeyIsObject(lhs[o])) {
                    result[o] = merge(lhs[o], rhs[o])
                } else {
                    result[o] = Object.assign(lhs[o], rhs[o])

                }
            } else {
                result[o] = rhs[o]
            }
        } else {
            result[o] = rhs[o]
        }

    }
    for (let k in lhs) {
        if (!rhs[k]) {
            result[k] = lhs[k]
        }
    }
    console.log("result", result)
    return result
}

///export default merge;

function merge1(lhs: Indexed, rhs: Indexed): Indexed {
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
                merge1(lhs[i] as Indexed, rhs[i] as Indexed);
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


merge1({a: {b: {a: 2}},  d:6}, {a: {b: {c: 1}}});
/*
{
	a: {
		b: {
			a: 2,
			c: 1,
		}
	},
	d: 5,
}
*/

let a = {a: 1, b: 1}
console.log("keys", KeyIsObject(a))
let b = {a: 2, c: 2, d: {c: 5}}
console.log("keys", KeyIsObject(b))
let c = Object.assign(a, b)
console.log(c)


function getHiddenCard(card: string, count: number = 4) {
    let z = ''
    for (let i = 0; i < count; i++) {
        z += "*"
    }
    console.log(z)
    const regex = /^\d{12}/gm;
    let result = card.replace(regex, z)
    console.log(result)
    return result
}

getHiddenCard('1234567812345678', 2) //
const fruits = [1, 3, 8, 9, 100, 23, 55, 34];
const getEvenNumbers = fruits.map((name) => {
    if(name%2==0) {
        console.log(name)
        return name
    }
});

console.log(getEvenNumbers)// "**5678"