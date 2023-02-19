import { Schema, model } from 'mongoose';

export interface IItem{
    id: string;
    poster_email: string;
    poster_contactinfo: string;
    type: boolean;
    name: string;
    img: string;
    characteristic: string;
    loc: string;
    date: string;
    more_info: string;
    status: boolean;
}

export const ItemSchema = new Schema<IItem>(
    {
        poster_contactinfo: { type:String, required:true },
        poster_email: { type:String, required:true },
        type: { type:Boolean, required:true },
        name: { type:String, required:true },
        img: { type:String, required:true },
        characteristic: { type:String, required:true},
        loc: { type:String, required:true },
        date: { type:String, required:true },
        more_info: { type:String, required:true },
        status: { type:Boolean, required:true },
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const ItemModel = model<IItem>('items', ItemSchema);