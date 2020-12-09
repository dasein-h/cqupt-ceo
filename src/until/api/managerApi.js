import Service from "../Service";

//展示比例
function showSet(teachclass){
    Service.post('/admin/showConfig',{
        teachclass
    })
}
export{
    showSet
}