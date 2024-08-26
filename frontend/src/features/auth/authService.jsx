import axios from 'axios'



const register = async (userData) => {
    const API_URL = "/api/users/"

    const response = await axios.post(API_URL, userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const API_URL = "/api/users/" + "login"

    const response = await axios.post(API_URL, userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout =  () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService