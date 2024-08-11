import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


// @desc    Register new user 
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler (async (req, res)=> {
    const {name, email, password} = req.body

    if (!name|!email|!password){
        res.status(400)
        throw new Error ("pls add all fields")
    }

    // check user exist?
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("User already exist")
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //creat user
    const user = await User.create(
        {
            name,
            email,
            password: hashPassword
        }
    )

    if (user){
        res.status(201).json(
            {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            }
        )
    }else {
        res.status(400)
        throw new Error("INvalid user data")
    }

})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler (async (req, res)=> {
    const {email, password} = req.body

    const  user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json(
            {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            }
        )
    }else {
        res.status(400)
        throw new Error("INvalid credentials")
    }
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  private
const getMe = asyncHandler (async (req, res)=> {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json(
        {
            id:_id,
            name,
            email,
        }
    )
})

// Generate JWT
const generateToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '30d'})
}

export {registerUser ,loginUser ,getMe};