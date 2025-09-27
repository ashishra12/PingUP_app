export const protect =async (req, res, next) => {
    try {
        const { userId } = await req.auth();
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.error("❌ Error in auth middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
