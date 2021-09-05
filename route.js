/**
 * title: 
 * description: 
 * author:
 * date
 */

const { sampleHandeler } = require("./handelers/routeHandeler/sampleHandeler");
const { userHandeler } = require("./handelers/routeHandeler/userHandeler");

// dependencies

const route = {
    sample: sampleHandeler,
    user: userHandeler
}


module.exports = route;