// dependencies   
const {createHmac}  = require('crypto') 
require('dotenv').config();
const stringifyJson = (string) => { 

    let output;
    try{
        output = JSON.stringify(string)
    }catch{
        output = {}
    }
    return output;

};


const parseJson = (json) => {
    let output;
    try{
        output = JSON.parse(json);
    }catch{
        output = {}
    }
    return output;
    // return JSON.parse(json);
};

const passwordConverter = (secuirityKey, password) => {

    const passwordConverter = createHmac('sha256', secuirityKey)
    passwordConverter.update(password);
    
    return passwordConverter.digest('hex');

    //return createHmac('sha256',secuirityKey).update(password).digest('hex'); 
}

const _string_validator = (string) => {
    return result = 
                    typeof string === 'string' && string.trim().length > 0 ? string : false;
}
const _phone_validator = (string) => {
    return result = 
                    typeof string === 'string' && string.trim().length === 11 ? string : false;
}
const _agreements_validator = (string) => {
    return result = 
                    typeof string === 'boolean' && string ? string : false;
}

const converter = (data, convert) => {
    console.log(data);
    converter([data.name,data.email,data.phone])
}


module.exports = {parseJson, stringifyJson, passwordConverter, converter, _agreements_validator, _string_validator, _phone_validator};