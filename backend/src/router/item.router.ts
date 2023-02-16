
const cloudinary = require("../configs/cloudinary.config");
const upload = require("../configs/multer.config");
import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { IItem, ItemModel } from '../models/item.model';


const router = Router();


  router.post("/post", asyncHandler(
    async (req, res) => {
        const {poster_email, poster_contactinfo, type, name, img, characteristic, loc_found, date_found, more_info, status} = req.body;
 //       const result = await cloudinary.uploader.upload(req.file?.path);
        const Item: IItem = {
                poster_email,
                poster_contactinfo,
                type,
                name, 
                img,
                characteristic, 
                loc_found, 
                date_found,
                more_info, 
                status
        }
        const dbItem = await ItemModel.create(Item);
        res.send(dbItem);
    }
  ))

  router.post("/upload", upload.single('image') ,asyncHandler(
    async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file?.path);
        res.send(result.secure_url);
    }
  ))


export default router;

