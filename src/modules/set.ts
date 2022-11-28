type Indexed<T = unknown> = {
    [key in string]: T;
};

function set(object: Indexed , path: string, value: unknown): Indexed | unknown {
    // Код

    if ((typeof object) === "object") {
        if ((typeof path) === "string") {
            let key = ''
            const regex = /^\w+.?/gm;
            let find = regex.exec(path)
            path = path.replace(regex, '')
            if (find) {
                key = find[0].replace(".", '')
            }
            if (key != "") {
                if (!object[key]) {
                    console.log("objeckt.key")
                    if (path.length != 0) {
                        Object.assign(object, {[key]: {}})
                        set(object[key] as Indexed, path, value)
                    } else {
                        Object.assign(object, {[key]: value})
                    }
                }
            }

        } else {
            throw new Error("path must be string");
        }
        return object
    } else {
        return object
    }


}

//export default set

set({foo: 5}, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
set(3, 'foo.bar', 'baz'); // 3
