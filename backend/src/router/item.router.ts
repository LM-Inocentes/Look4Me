
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
        const items = await ItemModel.find({type: true}).sort({date:-1});
        res.send(items);                       //sending items from database
    }
  ))

  router.get("/lost", asyncHandler(
    async (req, res) =>{
        const items = await ItemModel.find({type: false}).sort({date:-1});
        res.send(items);                
    }
  ))

  router.get("/info/:id", asyncHandler(
    async (req, res) =>{
      const item = await ItemModel.findOne({_id: req.params.id});
      res.send(item);                       
  }
))

  router.get("/lost/search/:searchTerm", asyncHandler(
    async (req, res) => {
      const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const items = await ItemModel.find( {"$and": 
      [{"$or": [
        { name: { '$regex': searchRegex } },
        { characteristic: { '$regex': searchRegex } },
        { loc: { '$regex': searchRegex } },
      ]
      },
      { type:false}
    ] });
      res.send(items);
    }
  ))

  router.get("/found/search/:searchTerm", asyncHandler(
    async (req, res) => {
      const searchRegex = new RegExp(req.params.searchTerm, 'i');
      const items = await ItemModel.find( {"$and": 
      [{"$or": [
        { name: { '$regex': searchRegex } },
        { characteristic: { '$regex': searchRegex } },
        { loc: { '$regex': searchRegex } },
      ]
      },
      { type:true}
    ] });
      res.send(items);
    }
  ))


export default router;

