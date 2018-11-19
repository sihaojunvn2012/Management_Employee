import { ManagementData } from './FirebaseConnect'
var redux = require('redux');
const EmployeesInitialState = {
    items: {},
    EditState: false,
    Sort: '',
    AlertShow: false,
    AlertContent: '',
    Type: '',
    StateTitle: false,
    
}
const allReducer = (state = EmployeesInitialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            console.log(JSON.stringify(action.GetItems));
            ManagementData.push(action.GetItems);
            return state
        case "GET_EDIT_DATA":
            return { ...state, items: action.GetItems }
        case "CHANGE_STATE":
            return { ...state, EditState: !state.EditState }
        case "EDIT_DATA":
            ManagementData.child(action.Items.KeyID).update({
                Birthday: action.Items.Birthday,
                Email: action.Items.Email,
                Name: action.Items.Name,
                NumberPhone: action.Items.NumberPhone,
                Password: action.Items.Password,
                Permission: action.Items.Permission
            });
            //  console.log(JSON.stringify(action.Items));
            return { ...state, items: {} }
        case "REMOVE_DATA":
            //  console.log("sussecful" +JSON.stringify(action.Items)); 
            ManagementData.child(action.Items).remove();
            return state
        case "GET_STATE_SORT":
            return { ...state, Sort: action.SortName }
        case "TURN_ON":
            return { ...state, AlertShow: true, AlertContent: action.AlertContents, Type: action.Types }
        case "TURN_OFF":
            return { ...state, AlertShow: false }
        case "ADD_TITLE":
            return { ...state, StateTitle: action.AddTitle }
        case "EDIT_TITLE":
            return { ...state, StateTitle: action.EditTitle }
        default:
            return state
    }
}
var store = redux.createStore(allReducer);
// store.subscribe(function () {
//     console.log(JSON.stringify(store.getState()));
// })
// store.subscribe (function(){
//     console.log(JSON.stringify(store.getstate()));
    
// })
export default store;