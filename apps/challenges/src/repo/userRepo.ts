import mongoose from 'mongoose';
import User from '../model/user';

const getUserByID = async (id: mongoose.Types.ObjectId) => {
    // get user by id from mongo
    const user = await User.findOne({
        _id: id
    });
    return user;
}

const getUserByEmail = async (email: string) => {
    const user = await User.findOne({
        email: email
    });
    return user;
}

const createUser = async (
    name: string,
    email: string,
) => {
    const user = await User.create({
        name: name,
        email: email,
        active: true,
    });
    return user;
}

const UserRepo = {
    getUserByID,
    getUserByEmail,
    createUser,
}

export { UserRepo as default };