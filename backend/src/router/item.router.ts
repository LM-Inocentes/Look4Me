
const cloudinary = require("../configs/cloudinary.config");
const upload = require("../configs/multer.config");
import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { IItem, ItemModel } from '../models/item.model';


const router = Router();


  router.post("/upload", upload.single('image') ,asyncHandler(
    async (req, res) => {
        const {type, name, characteristic, loc_found, date_found, more_info, status} = req.body;
        const result = await cloudinary.uploader.upload(req.file?.path);
        const Item: IItem = {
                type,
                name, 
                img: result.secure_url, 
                characteristic, 
                loc_found, date_found,
                more_info, 
                status
        }
        const dbItem = await ItemModel.create(Item);
        res.send(dbItem);
    }
  ))



export default router;

