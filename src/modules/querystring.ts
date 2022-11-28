type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
    key: 1,
    key2: 'test',
    key3: false,
    key4: true,
    key5: [1, 2, 3],
    key6: {a: 1},
    key7: {b: {d: 2}},
};

function queryStringify(data: StringIndexed): string | never {
  let str=''
    if(typeof data==="object"){
        for(let i in data){
            console.log(data[i]);
            if((typeof data[i])==="object"){
                if(Array.isArray(data[i])){
                    console.log("isarray",data[i].length);
                    for(let b=0; b<data[i].length; b++){
                        str+="&"+i+"["+b+"]"+"="+data[i][b]
                    }
                }else{
                    for(let key in data[i]){
                        let keyregex = new RegExp('key\\d', 'gi')
                        if((typeof data[i][key])==="object"){
                            if(keyregex.test(i)){
                                str+="&"+i+queryStringify(data[i])
                            }else{
                                str+="&"+"["+key+"]"+queryStringify(data[i])
                            }
                        }else{
                            if(keyregex.test(i)){
                                str+="&"+i+"["+key+"]"+"="+data[i][key]
                            }else{
                                str+="&"+'['+i+']'+"["+key+"]"+"="+data[i][key]
                            }

                        }
                    }
                }
            }else{
                str+="&"+i+"="+data[i]
            }

        }
        str=str.slice(1)
        console.log("str", str)
        return str
    }
    else return 'input must be an object'

}



queryStringify(obj);
// 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
// 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][b][d]=2