/**
 * title: lib data for crud operation
 * description: learning node crud operation
 * author: md sohidul islam
 * date: 
 */

// dependencies
const fs = require('fs'); 
const path = require('path');

// lib object module-scaffolding
const lib = {};
const basedir = path.join(__dirname,'.././database');

lib.create = (dir, file, data, callback) => { 

    // create user json file
    fs.open(`${basedir}/${dir}/${file}.json`,'wx',(err,descriptor)=>{
        if(!err){ 
                // write user
                fs.writeFile(descriptor, data, (writeError) => {
                    if(!writeError){ 
                        // close the user
                        fs.close(descriptor,(closeError)=>{
                            if(!closeError){
                                callback(200, 'Successfully user created');
                            }else{
                                callback(500, closeError.message);
                            }
                        })
                    }else{
                        callback(500, writeError.message);
                    }
                })
    
        }else{
            callback(500, err.message);
        }
    })

}

lib.read =(dir, file, callback) => {
    fs.readFile(`${basedir}/${dir}/${file}.json`,'utf-8',(err,data)=>{
        if(!err){
            callback(200, JSON.parse(data));
        }else{
            callback(500,{})
        }
   })
}


lib.update = (dir, file, data, callback) => {
    
        fs.open(`${basedir}/${dir}/${file}.json`,'r+',(err,descriptor) => {
            if(!err){ 

                fs.writeFile(descriptor, data,(writeErr)=>{
                    if(!err){
                        fs.close(descriptor,(closeErr)=>{
                            if(!closeErr){ 

                                callback(200,'Successfully file updated');

                            }else{
                                callback(500, err.message);
                            }
                        })
                    }else{
                        callback(500, writeErr.message);
                    }
                })

            }else{
                callback(err.message);
            }
        })
}

lib.delete = (dir,file,callback)=>{

    fs.unlink(`${basedir}/${dir}/${file}.json`,(err)=>{
        if(!err){
            callback(200, 'successfully user deleted');
        }else{
            callback(500, err.message);
        }
    });

};


//exported the module
module.exports = lib;