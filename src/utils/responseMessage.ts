import { _httpStatusService } from "./_httpStatus";
import * as messages from './message';
interface Success{
    created: string
    updated: Object
    deleted: string
    modified:string

};
function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



   
  
   


export const  enumType = {

    language:{
        English:"en",
        Korean:"ko",
        Spanish:"es",
        Chinese:"zh"
    },
}


export const resObj = {
    success:(value:string,data:any) =>{
        let resObj = {
            status:_httpStatusService.status.OK,
            message:`${value}  list successfully !`,
            data:data
        } 
      return  resObj
    },
    create:(value:string,data:Object) =>{
        let resObj = {
            status:_httpStatusService.status.OK,
            message:`${value} create successfully !`,
            data:data
        } 
      return  resObj
    },



    login:(data?:Object,token?:any,result?:any,driverApproved?:any) =>{
        let resObj = {
            status:_httpStatusService.status.OK,
            message:messages.message.Login,
            token:{
                accessToken:token
            },
            data:data,
            result:result,
            driverApproved:driverApproved
        } 
      return  resObj
    },

    error:(value:any)=>{
        let resObj = {
            status:_httpStatusService.status.serverError,
            message:`${value?.message}` || 'Server error !',
        }
        return resObj
    },

    list:(value:string,data?:any) =>{
        let resObj = {
            status:_httpStatusService.status.success,
            message:`${value} list successfully !`,
            data,
            
        }
        return resObj
    },
    details:(value:string,data?:any) =>{
        let resObj = {
            status:_httpStatusService.status.success,
            message:`${value} Details successfully !`,
            data
        }
        return resObj
    },
    signupSuccess:() =>{
        let resObj= {
            status: _httpStatusService.status.success,
            messages: "Successfully added detail"
        }
        return resObj
    },
    deleteObj:(data?:any) =>{
        let resObj = {
            status:_httpStatusService.status.success,
            message:`delete successfully !`,
            data
        }
        return resObj
    },
    blockObj:(data?:any) =>{
        let resObj = {
            status:_httpStatusService.status.success,
            message:`block successfully !`,
            data
        }
        return resObj
    },
    singUp:(data?:any)=>{
        return {
            status:_httpStatusService.status.success,
            message:messages.message.OTP_SENT,
        }
    },
    forgetPassword:(data?:any)=>{
        return {
            status:_httpStatusService.status.success,
            message:messages.message.OTP_SENT,
        }
    },
    update:(value:string,data?:Object)=>{
      return {
          status:_httpStatusService.status.OK,
          messages:`${value} update successfully !`,
          message:`${value} update successfully !`,
          data:data
      }
    },
    pageNotFound:(url:string)=>{
        return {
            status:_httpStatusService.status.NotFound,
            message:"Page not found",
            url:url
        }
    },
    InvalidJson:(message?:any)=>{
        return {
            status:_httpStatusService.status.badRequest,
            message:message ||"Invalid Payload JSON "
        }
    },
    logOut:{
        status:_httpStatusService.status.success,
        messages:"Logout Successfully",
        message:"Logout Successfully"
    },
    passwordChange:{
        status:_httpStatusService.status.success,
        messages:"Successfully Password changed",
        
    },
    resetPassword:{
        status:_httpStatusService.status.success,
        messages:"Successfully reset your password"  
    },

    documentUpload:(data?:any)=>{
        return {
            status:_httpStatusService.status.success,
            message:"Successfully Document upload",
            data:data
        }
    }

}

export const _infoMessaage  = {
   required:(value?:string)=>{
    return  `This field is required`
    },
   unique:(value?:string)=>{
       return `${value} already exists`
   },
   minLength:(min:Number)=>{
       return `minimum ${min} characters`
   },
   Invalid:(value:string)=>{
       return `${value} is invalid`
   },
   emailNotRegex:(value:string)=>{
     return `${value} is not exist`
   },
   passwordMatch:"Invalid user credentials",
   lowercase:'one latter must be lowercase',
   uppercase:'one latter must be uppercase',
   number:'one latter must be number',
   alphanumeric:'one latter must be alphanumeric',
   confirmPassword:'Password and confirmPassword not match',
   blockedUser:'Your account has been blocked,   contact admin',
   NotFoundUser:'User is not found',
   invalidId:(value:string)=>{
    return "  enter a valid "+value
   }

}
