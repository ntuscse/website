import mongoose from 'mongoose';
import UserRepo from '../repo/userRepo';

const getUserByID = async (id: string) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error('Invalid user ID');
    }
    const _id = new mongoose.Types.ObjectId(id);
    const user = await UserRepo.getUserByID(_id);
    return user;
}

const createUser = async (
    name: string,
    email: string,
) => {
    const user = await UserRepo.createUser(name, email);
    return user;
}

const UserService = {
    getUserByID,
    createUser
}

export { UserService as default };