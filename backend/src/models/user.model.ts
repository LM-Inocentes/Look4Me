import { Schema, model } from 'mongoose';

export interface IUser{
    id: string;
    email: string;
    password: string;
    Firstname: string;
    Lastname: string;
    isAdmin:boolean;
}

export const UserSchema = new Schema<IUser>(
    {
        Firstname: { type:String, required:true },
        Lastname: { type:String, required:true },
        email: { type:String, required:true, unique:true },
        password: { type:String, required:true },
        isAdmin: { type:Boolean, required:true },
        
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

export const UserModel = model<IUser>('user', UserSchema);