const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { signUpschema, options } = require('../utils/validation')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const createToken = (_id, email) => {
    const verificationToken = crypto.randomBytes(16).toString('hex')
    return jwt.sign({ _id, email, verificationToken }, process.env.JWT_SECRET, { expiresIn: '1d' })
  }


const signUp = async(req, res) =>{

    const { name, email, password} = req.body;

    const emailExist = await User.findOne({email})

    if(emailExist){
        throw Error('Email already in use')
    }

    const validateResult = signUpschema.validate(req.body, options);

    if(validateResult.error){
        res.status(400).json({error:validateResult.error.details[0].message})
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)

  try {
    const newUser = await User.create({name, email, password:hash})

    const token = createToken(newUser._id, newUser.email)

    res.status(200).json({token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email or Password invalid' });
    }
  
    try {
      const checkUser = await User.findOne({ email });
  
      if (!checkUser) {
        return res.status(404).json({ error: 'Email does not exist' });
      }
  
      const matchPassword = await bcrypt.compare(password, checkUser.password);
  
      if (!matchPassword) {
        return res.status(401).json({ error: 'Incorrect Password' });
      }
  
      const token = createToken(checkUser._id, checkUser.email);
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


module.exports = { signUp, login };