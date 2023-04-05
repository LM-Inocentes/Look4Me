
const cloudinary = require("../configs/cloudinary.config");
const upload = require("../configs/multer.config");
import { Router } from 'express';
import  asyncHandler  from 'express-async-handler';
import { IItem, ItemModel } from '../models/item.model';


const router = Router();

  router.post("/post", upload.single('image') ,asyncHandler(
    async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file?.path);
        const {poster_id, poster_name, poster_email, poster_contactinfo, 
       //   retriever_id, retriever_name, retriever_email, retriever_contactinfo,
          type, name, characteristic, loc, date, more_info, status} = req.body;
        const Item: IItem = {
                poster_id,
                poster_name,
                poster_email,
                poster_contactinfo,
                type,
                name,
                img: result.secure_url,
                imgName: result.public_id,
                characteristic,
                loc,
                date,
                more_info,
                status,
                id: "",
                retriever_id: "", 
                retriever_name: "", 
                retriever_email: "", 
                retriever_contactinfo: "",
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

  router.patch("/info/edit1/:id", asyncHandler(
    async (req, res) =>{
    //  const result = await cloudinary.uploader.upload(req.file?.path);
      const {name, characteristic, loc, date, more_info} = req.body;
      const item = await ItemModel.findOne({_id: req.params.id});
      console.log(item);
      if(name){
        await item!.updateOne({ $set: { "name": name } });
      }
      if(characteristic){
        await item!.updateOne({ $set: { "characteristic": characteristic } });
      }
      if(loc){
        await item!.updateOne({ $set: { "loc": loc } });
      }
      if(date){
        await item!.updateOne({ $set: { "date": date } });
      }
      if(more_info){
        await item!.updateOne({ $set: { "more_info": more_info } });
      }
      console.log(item);
      res.send();                    
    }
  ))

  router.delete("/delete-item/:id", asyncHandler(
    async (req, res) => {
      const ITEM = await ItemModel.findOne({ _id: req.params.id });
      await cloudinary.uploader.destroy(ITEM?.imgName);
      await ITEM!.delete(); 
      res.send();
    }
  ))


export default router;

