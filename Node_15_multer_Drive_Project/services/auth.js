const jwt=require('jsonwebtoken');
const secretKey="J!a@t#i$n%@^1&3*2(5"
function builtTheToken(user){
    const plainObject={
        _id:user[0]._id,   //user[0]._id isi me kuchh dikkat hai  ObjectId 
        Name:user[0].Name,
        email:user[0].email,
        role:user[0].role
    };
    return jwt.sign(plainObject,secretKey);
}
function decodeTheToken(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secretKey);
    }
    catch(error){
        return null;
    }
}

module.exports={
    builtTheToken,
    decodeTheToken
}