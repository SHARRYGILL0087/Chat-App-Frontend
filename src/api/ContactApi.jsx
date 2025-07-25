import axios from "axios"

const ContactApi = async (userId) => {
  try {
    const res = await axios.post('http://localhost:8000/contact/get' , {userId} , {withCredentials : true})
    // console.log(res.data.contact.contacts)
    return res.data.contact.contacts
    return 
  } catch (error) {
    console.log('Contact Error' , error.message)
  }
}

export default ContactApi

