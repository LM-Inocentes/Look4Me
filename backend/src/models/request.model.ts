import { Schema, model } from 'mongoose';

export interface IRequest{
    id: string;
    type: boolean;
    name: string;
    img: string;
    imgName: string;
    characteristic: string;
    loc: string;
    date: string;
    more_info: string;
    status: boolean;

    poster_id: string;
    poster_email: string;
    poster_name: string;
    poster_contactinfo: string;
    poster_date: string;

    request_id: string;
    request_email: string;
    request_name: string;
    request_contactinfo: string;
    request_date: string;
}

export const RequestSchema = new Schema<IRequest>(
    {
        type: { type:Boolean, required:true },
        name: { type:String, required:true },
        img: { type:String, required:true },
        imgName: { type:String, required:true },
        characteristic: { type:String, required:true},
        loc: { type:String, required:true },
        date: { type:String, required:true },
        more_info: { type:String, required:true },
        status: { type:Boolean, required:true },

        poster_id: { type:String, required:true },
        poster_email: { type:String, required:true },
        poster_name: { type:String, required:true },
        poster_contactinfo: { type:String, required:true },

        request_id: { type:String, required:false },
        request_email: { type:String, required:false },
        request_name: { type:String, required:false },
        request_contactinfo: { type:String, required:false },
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

export const RequestModel = model<IRequest>('request', RequestSchema);