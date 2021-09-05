/**
 * title: 
 * description: 
 * author:
 * date
 */

const { _string_validator, _phone_validator, _agreements_validator, passwordConverter, stringifyJson } = require("../../helpers/utilites");
const lib = require("../../lib/data");

 

// dependencies

// handle object module-scaffolding
const handle  = {};
require('dotenv').config();


handle.userHandeler = (req, res) => {
    
    const acceptedMethods = ['get','post','put','delete'];

    if(acceptedMethods.indexOf(req.method) > -1){
        handle._user[req.method](req,res);
    }


    // if(req.body){ 
    //     res(200, req.body);
    // }
    // res(200, {maessage: 'Successfully user router working'});
     
}
handle._user={};

handle._user.get = (req, res)=>{ 
    let phone = req.queryObj.phone;

    let phone_ = _phone_validator(phone);

    if(phone_){ 
         lib.read('users',phone,(statusCode,data) => {
             if(statusCode === 200){
                 delete data.password
                 res(200, data) 
             }else{
                res(500, {message: 'This phone was not found in our database'})
             }
         })
    }else{
        res(500, {message: 'This phone was not found in our database'})
    }
}
handle._user.post = (req, res)=>{ 
    let {first_name, last_name, phone, password, tos_agreements} = req.body;
    
    
     firstName= _string_validator(first_name);
     lastName= _string_validator(last_name);
     phone_ = _phone_validator(phone);
     password_ = _string_validator(password);
     tos_agreements_ = _agreements_validator(tos_agreements)

     if(firstName, lastName, phone_, password_, tos_agreements_){  
       password = passwordConverter(process.env.passwordSecreetKey,'ssssssss'); 

       let obj = {first_name, last_name, phone, password, tos_agreements}; 
        lib.read('users',phone,(statusCodeR, resultR)=>{
            if(statusCodeR === 500){
                lib.create('users',phone, stringifyJson(obj), (statusCode, result)=>{
                    if(statusCode === 200){
                       res(statusCode, {message: result})
                    }else{
                       res(statusCode, {message: result})
                    }
                })
            }else{
                res(500, {message: 'This phone number is already taken'})
            }
        })
       }else{
                res(500, {message: 'invalid information'});
       }
}
handle._user.put = (req, res)=>{
    let {first_name, last_name, phone, password, } = req.body;
    
    
     firstName= _string_validator(first_name);
     lastName= _string_validator(last_name);
     phone_ = _phone_validator(phone);
     password_ = _string_validator(password); 

     if(firstName, lastName, password_){  
       password = passwordConverter(process.env.passwordSecreetKey,password); 

       lib.read('users',phone,(statusCodeR, resultR)=>{
           let userData = {...resultR}
           console.log(userData);
        if(statusCodeR === 200){
            userData.first_name = first_name;
            userData.last_name = last_name;
            userData.password = password; 
            lib.update('users',phone, stringifyJson(userData),(statusCode, result)=>{

                if(statusCode===200){
                    res(200, {message: 'Successfully user data updated'})
                }else{
                    res(500, {message: result})
                }

            })

        }else{
            res(500, {message: 'This phone was not found in our database'})
        }
    })


     }else{
         res(500, {message: 'invalid information'});
     }
}
handle._user.delete = (req, res)=>{
    let phone = req.queryObj.phone;
    let phone_ = _phone_validator(phone);
    if(phone_){

        lib.read('users',phone,(statusCodeR, resultR)=>{
            if(statusCodeR === 200){
                
                lib.delete('users',phone,(statusCode, result) => {
                    if(statusCode===200){
                        res(200, {message: 'Successfully user deleted'})
                    }else{
                        res(500, {message: `Can't delete this users`})
                    }
                })
    
            }else{
                res(500, {message: 'This phone was not found in our database'})
            }
        })

    }else{

        res(500, {message: 'Invalid phone number'})

    }

}

module.exports = handle;