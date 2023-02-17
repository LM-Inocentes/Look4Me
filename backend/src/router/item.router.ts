
const cloudinary = require("../configs/cloudinary.config");
const upload = require("../configs/multer.config");
import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { IItem, ItemModel } from '../models/item.model';


const router = Router();

  router.post("/post", upload.single('image') ,asyncHandler(
    async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file?.path);
        const {poster_email, poster_contactinfo, type, name, characteristic, loc_found, date_found, more_info, status} = req.body;
        const Item: IItem = {
                poster_email: poster_email,
                poster_contactinfo: poster_contactinfo,
                type: type,
                name: name, 
                img: result.secure_url,
                characteristic: characteristic, 
                loc_found: loc_found, 
                date_found: date_found,
                more_info: more_info, 
                status: status,
        }
        const dbItem = await ItemModel.create(Item);
        res.send(dbItem);
    }
  ))


export default router;

