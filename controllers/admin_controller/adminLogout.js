const adminLogout = (req, res) => {
    try {
        res.clearCookie("admintoken", {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: "lax", // Adjust as necessary
            path : "/"
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.log("error in logout:", err);
        res.status(500).json({ message: err.message || "Server error" });
    }
};

module.exports = adminLogout; 