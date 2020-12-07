function tojson(arr){ 
    if(!arr.length) return null; 
    var i = 0; 
    let len = arr.length, 
    array = new Array() 
    for(;i<len;i++){ 
      array.push({"studentId":arr[i][0],"companyName":arr[i][1],"level":arr[i][2]}); 
    } 
    return JSON.stringify(array); 
  }
  export default tojson