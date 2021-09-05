/**
 * title: 
 * description: 
 * author:
 * date
 */

// dependencies

// handle object module-scaffolding
const notFoundHandeler = (req, res) => {
    res(404, {message:`can't find your targeted url`})
}


module.exports = notFoundHandeler;