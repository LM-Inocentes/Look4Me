
const cloudinary = require("../configs/cloudinary.config");
const upload = require("../configs/multer.config");
import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { IItem, ItemModel } from '../models/item.model';


const router = Router();

  router.post("/post", upload.single('image') ,asyncHandler(
    async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file?.path);
        const {poster_email, poster_contactinfo, type, name, characteristic, loc, date, more_info, status} = req.body;
        const Item: IItem = {
                poster_email,
                poster_contactinfo,
                type,
                name,
                img: result.secure_url,
                characteristic,
                loc,
                date,
                more_info,
                status,
                id: "",
        }
        const dbItem = await ItemModel.create(Item);
        res.send(dbItem);
    }
  ))

  router.get("/found", asyncHandler(
    async (req, res) =>{
        const items = await ItemModel.find({type: true});
        res.send(items);                       //sending events from database
    }
  ))


export default router;

