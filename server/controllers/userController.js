import User from "../models/userModel.js";

export const getUserData = async (req,res) => {
    try {
        const { userId } = await req.auth();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       res.status(200).json(user);
    } catch (error) {
        console.error("❌ Error fetching user data:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// update user data
export const updateUserData = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        const { email, fullName, profilePicture } = req.body;
        user.email = email || user.email;
        user.fullName = fullName || user.fullName;
        user.profilePicture = profilePicture || user.profilePicture;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("❌ Error updating user data:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// get user by id
   