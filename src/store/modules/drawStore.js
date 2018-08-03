// import "../../../static/webBridge.js"
// function shareFinished(data) {
//     alert(data.platformType)
//     // document.getElementById("app").setAttribute("myprop",data.platformType)
    
// } //调iOs
const state = {
    type:""
}
const getters = {
    total(state){
        state.type = localStorage.platformType
        return state.type
    }
}


const actions = {

    
}
const mutations = {
    // total(state){
      
    //     state.total = localStorage.platformType
    // }
}
export default {
    state,
    getters,
    actions,
    mutations
}
