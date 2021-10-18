const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (passowrd)=>{
    const salt =  bcrypt.genSaltSync(1);
    const hash = bcrypt.hashSync(passowrd,salt);
    return hash
};

helpers.matchPassword = async (password, savedPassword)=>{
    try {
        const valide = await bcrypt.compare(password, savedPassword)
        return valide
        
    } catch (error) {
        console.log(error);
        return false
    }
   
};

module.exports = helpers;