import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        devices: [
            {
                deviceId: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                password: {
                    type: String,
                    required: true,
                },
                switches: [
                    {
                      id: {
                        type: String,
                        required: true,
                      },
                      name: {
                        type: String,
                        required: true,
                      },
                    },
                ],
            },
        ],
    },
    {timestamps:true}
);

const User = mongoose.model("User",userSchema)

export default User