import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// login user 

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id); // to create token for authantication
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// registerUser 
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // checking is user already exits 
        const exits = await userModel.findOne({ email });
        if (exits) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format and strong password 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter Valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter Strong Password" });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);  // 5 to 15 high = strong
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();  // to save user in db
        const token = createToken(user._id);  // to create token for authantication
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
}

export { loginUser, registerUser };