function trim(str, reg) {
    //console.log(str);
    //regexp = new RegExp("шаблон", "флаги");
    let s = '';
    let f = false;
    let spaces = '';
    for (let i = 0; i < str.length; i++) {
       // console.log(str[i])
        if (str[i] == ' ') {
            if (!f) {
                continue
            }
            spaces += str[i]
        } else {
            if (spaces.length > 0) {
                s += spaces;
                spaces = '';
            }
            s += str[i];
            if (!f) {
                f = true;
            }
        }

    }
    //console.log(s);
    return s;
}

trim("   fgjhg  h jg  ")

function trim1(str:string, templ:string|null=null) {

    console.log(str)
    console.log("templ-", templ)
    if (templ == null) {
        str=str.replace("\xA0", " ")
        templ = " "
    }
    let temp:string = ''
    for (let i = 0; i < templ.length; i++) {
        if (i == 0) {
            temp += templ[i]
        } else {
            temp += "|" + templ[i]
        }
    }
    let first:string = "^" + "(" + temp + ")" + '+';
    let end:string = "(" + temp + ")" + '+' + "$";
    let regfirst:RegExp = new RegExp(first, "gi")
    let regend:RegExp = new RegExp(end, "gi")
    let result:string = str.replace(regfirst, "");
    result = result.replace(regend, "");
    console.log(result)
    return result
}

trim1("fyyukfy", "fy")
trim1('  abc  '); // => 'abc'
trim1('-_-abc-_-', '_-'); // => 'abc'
trim1('\xA0foo'); // "foo"
trim1('\xA0foo', ' '); // " foo"
trim1('-_-ab c -_-', '_-');
let arr=['  foo  ', '  bar  '].map(value => trim1(value));
console.log(arr)

console.log("\xA0"===" ")