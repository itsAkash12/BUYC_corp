import {CLEAR_ERRORS, ERROR_AUTH, LOADING_AUTH, LOGIN_AUTH, SIGNUP_AUTH } from "../ActionTypes/Auth.actiontypes";

export const loadingAuth = ()=> ({type:LOADING_AUTH});
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
export const signupAuth = (input)=> async(dispatch)=> {
    dispatch(loadingAuth({type:LOADING_AUTH}));
    try {
        let res = await fetch(`${process.env.REACT_APP_BASEURL}/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(input)
        });
        let result = await res.json();
        if(result.status == "failed"){
            return  dispatch({type:ERROR_AUTH, payload:result.message})
        }
        return dispatch({type:SIGNUP_AUTH, payload:result})
    } catch (error) {
        return  dispatch({type:ERROR_AUTH, payload:error})
    }
}

export const loginAuth = (input)=> async(dispatch)=> {
    dispatch(loadingAuth({type:LOADING_AUTH}));
    try {
        let res = await fetch(`${process.env.REACT_APP_BASEURL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(input)
        });
        let result = await res.json();
        if(result.status == "failed"){
            return  dispatch({type:ERROR_AUTH, payload:result.message})
        }
        return dispatch({type:LOGIN_AUTH, payload:result})
    } catch (error) {
        return  dispatch({type:ERROR_AUTH, payload:error})
    }
}