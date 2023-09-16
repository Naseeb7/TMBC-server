import User from "../Models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({},{ firstName : 1, lastName : 1, email : 1});
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}