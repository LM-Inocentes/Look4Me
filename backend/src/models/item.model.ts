import { Schema, model } from 'mongoose';

export interface IItem{
    type: boolean;
    name: string;
    img: string;
    characteristic: string;
    loc_found: string;
    date_found: string;
    more_info: string;
    status: boolean;
}

export const ItemSchema = new Schema<IItem>(
    {
        type: { type:Boolean, required:true },
        name: { type:String, required:true },
        img: { type:String, required:true },
        characteristic: { type:String, required:true, unique:true },
        loc_found: { type:String, required:true },
        date_found: { type:String, required:true },
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