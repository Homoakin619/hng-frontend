import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exist!"],
        required: [true, "email is required"],
    },
    password : {
        type: String,
        required:true
    }
},{
    timestamps:true
});

UserSchema.pre('save',function() {
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(this.password,salt);
    this.password = hashedPassword;
})

UserSchema.methods.generateToken = function () {
    const token = jwt.sign({userId: this._id, username: this.username},
            process.env.JWT_SECRET as string,
            {expiresIn: process.env.JWT_LIFETIME || '3d'});
    return token;
}

UserSchema.methods.matchPassword = function(password: string) {
    return bcrypt.compareSync(password,this.password);
}

UserSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.password_hash;
    }
});

const User = models.User || model("User",UserSchema)
export default User;