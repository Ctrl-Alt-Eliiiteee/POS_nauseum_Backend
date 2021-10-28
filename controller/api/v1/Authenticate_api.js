const firebase = require('firebase/auth');

const auth = firebase.getAuth();

module.exports.signIn = async function(req,res){
    console.log(req);
    try{
        let user = await firebase.signInWithEmailAndPassword(auth,req.body.email,req.body.password);
        // console.log(await firebase.getAuth().currentUser);
        let token = await firebase.getAuth().currentUser.getIdToken();
        let status = await firebase.getAuth().currentUser.emailVerified;
        return res.json(200, {
            msg: `Api working ${req.body.email}`,
            token: token,
            verified : status,
        });
    }
    catch(e){
        return res.json(404, {
            msg: e.toString(),
        });
    }
} 
module.exports.signUp = async function (req, res) {
    console.log(req);
    try {
        let user = await firebase.createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
        // var token = await firebase.getIdToken(user);
        
        let check = await verifyEmail(firebase.getAuth().currentUser);
        // console.log('Status ', status);
        if (check == "Email Sent"){
            return res.json(200, {
                msg: `User created`,
            });
        }
        else{
            return res.json(200, {
                msg: `Error while sending the mail`,
            });
        }
        
    }
    catch (e) {
        return res.json(404, {
            msg: e.toString(),
        });
    }
}

module.exports.forgotPassword = async function(req,res){
    console.log(req);
    try{
        let user = await firebase.sendPasswordResetEmail(auth,req.body.email.trim());
        return res.json(200,{
                msg:'Email Sent',
        });
    }
    catch(e){
        console.log(e.toString());
        return res.json(400,{
            msg:'Something went wrong try again later',
        })
    }
}

async function verifyEmail(User){
    console.log(User);
    try{
        let user = await firebase.sendEmailVerification(User);
        return "Email Sent";
    }
    catch(e){
        return "Error Occurred";
    }
}