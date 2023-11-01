import constants from "../constants"

export const LoginActions=(payload)=>{
    return {type:constants.LOGIN,payload}

}

export const logout = (payload) => {
    return { type: constants.LOGOUT, payload };
  };