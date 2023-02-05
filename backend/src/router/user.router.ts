import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken'
import  asyncHandler  from 'express-async-handler';
import { IUser, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/httpstatus';
import bcrypt from 'bcryptjs';


const router = Router();

router.get("/seed", asyncHandler( async (req, res) =>{
    const usersCount = await UserModel.countDocuments();
    if(usersCount>0){
        res.send("Seed is already done!");
        return;
    }
    
    await UserModel.create(sample_users);
    res.send("Seed is DONE!");
}
))



router.post("/login",  asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({ email });
      if(!user){                                                                    //if user email does not exist
        res.status(HTTP_BAD_REQUEST).send("Email does not exist");
        return;
      }
      const isPassMatch = await bcrypt.compare(password, user.password);           
      if(isPassMatch) {
        res.send(generateTokenResponse(user));
      }
      res.status(HTTP_BAD_REQUEST).send("Incorrect Password");
      return;
    }
))


router.post('/register', asyncHandler(
    async (req, res) => {
      const {Firstname, Lastname, email, password} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(HTTP_BAD_REQUEST)
        .send('User email already exist!');
        return;
      }
    const salt = await bcrypt.genSalt(10); 
    const newUser:IUser = {
      id:'',
      Firstname,
      Lastname,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, salt),       //hash and salts the password with bcrypt
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);  
    res.send(generateTokenResponse(dbUser));
  }
))

router.get("/:email", asyncHandler(
  async (req, res) => {
    const user = await UserModel.findOne({ email: req.params.email });
    res.send(user);
  }
))



const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        id: user.id, email:user.email, isAdmin: user.isAdmin
    },"Some Text",{
        expiresIn: "30d"
    })
    return {
        id: user.id,
        email: user.email,
        password: user.password,
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        isAdmin: user.isAdmin,
        token: token,
      };
}

export default router;