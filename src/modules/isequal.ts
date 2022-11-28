function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
    console.log(a,b)
    let f=true
    let keysa=Object.keys(a)
    let keysb=Object.keys(b)
    console.log("arrakey",keysa.length===keysb.length)
    console.log(keysa.length)
    console.log(keysa.length)
  if((typeof a)==='object' && (typeof b)==='object'){
      if(keysa.length===keysb.length){
          for(let k in a){
              if(f===true){
                  if((typeof a[k])!=="object"){
                      if(b[k]===a[k]){
                          f=true
                      } else{f=false}
                  }else{f=isEqual(a[k] as object,b[k] as object)}
              }
          }
      }else{
          console.log("length false")
          f=false
      }

    }else{
      console.log("obj false")
      f=false
  }

console.log("f:", f)
return f

}



const a = {a: 1, b:{a:{c:4}}, h:8};
const b = {a: 1, b:{a:{c:4}}, h:8};
isEqual(a, b); // true