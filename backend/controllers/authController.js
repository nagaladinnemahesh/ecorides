import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register new user

const registerUser = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        // checking if user already exists
        const userExists = await User.findOne({email});
        if (userExists){
            return res.status(400).json({message: "User already exists"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user if not exist
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

// Login user 

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        //checking user if exists

        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        //check password match

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // send response with token

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error){
        res.status(500).json({message: error.message});
    }
}


// Generate JWT

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export {registerUser, loginUser};