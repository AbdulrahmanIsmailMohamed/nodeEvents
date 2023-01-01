const loginView = (req,res)=>{
    res.render("user/login")
}
const login = (req,res)=>{
    console.log(req.body);
    res.json("user in login...")
}

const signupView = (req,res)=>{
    res.render("user/signup");
}
const signup = (req,res)=>{
    res.json("user in signup...");
}

const profile = (req,res)=>{
    res.render("user/profile");
}

const logout = (req,res)=>{
    res.json("logout...")
}

module.exports = {
    loginView,
    login,
    profile,
    signup,
    signupView,
    logout
}