import axios from "axios"
 
const URL="https://signupfrom-backend.onrender.com/"


export const registerDeliveryAgent=async(name,mobileNumber,email,password,address,pincode,city,lon,lat)=>{
    try {

        const response=await axios.post(URL+"agent/sign_up",{
            name,mobileNumber,email,password,address,pincode,city,lon,lat
        })
return response

    } catch (error) {
        console.log(error)
    }

}