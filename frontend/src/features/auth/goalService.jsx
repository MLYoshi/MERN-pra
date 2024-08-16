import axios from "axios";

const goalService = async (goalData, token) => {
    const API_URL = 'http://localhost:8000/api/goals/'

    const config = {
        headers: {
        Authorization: `Bearer ${token}`
    }}

    const response = await axios.post(API_URL, goalData, config)

    return response.data
}

export default goalService