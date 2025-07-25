import { useContext } from "react"
import axios from "axios"


const UserApi = async (id) => {
    // console.log(id)
    try {
        const res = await axios.post(`http://localhost:8000/user/userinfo` , {id})
        // console.log('data',res.data.user)
        // console.log('User Obtainer!')
        return res.data.user
    } catch (error) {
        console.log('Error while getting user!!', error.message)
    }


}

export default UserApi
