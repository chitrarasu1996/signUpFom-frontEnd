import axios from "axios"
 
const URL="http://localhost:4000/"

export const registerDeliveryAgent=async(name,mobileNumber,email,password,address,pincode,city)=>{
    try {

        const response=await axios.post(URL+"agent/sign_up",{
            name,mobileNumber,email,password,address,pincode,city
        })
return response

    } catch (error) {
        console.log(error)
    }

}