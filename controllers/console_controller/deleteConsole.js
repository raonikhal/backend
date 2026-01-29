const Consoles = require("../../models/consoles_model");

const deleteConsole = async (req, res) => {
    try {
        const { consoleID } = req.params;
        
        const {adminID} = req.admin;

        const consoleData = await Consoles.findById(consoleID);

        if (!consoleData) {
            return res.status(400).json({ message: "Could not Find Data 😐" });
        }

        const deletedConsole = await Consoles.findByIdAndDelete({ _id: consoleID, creatorID : adminID }, consoleData, { new: true });

        res.status(200).json({ message: "Console Deleted Successfully ", deleted: deletedConsole });
    } catch (err) {
        res.status(500).json({ message: "Server Error ", err });
    }
}

module.exports = deleteConsole;