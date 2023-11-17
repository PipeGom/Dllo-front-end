export const getHeaders = (token) => {
    return{headers: {'Autorization':`Bearer ${token}`}}
}