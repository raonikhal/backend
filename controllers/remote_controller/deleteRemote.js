const remotes = require("../../models/remote_model");

const deleteRemote = async (req, res) => {
    try {
        const { remoteID } = req.params;
        const {adminID} = req.admin;

        const remoteData = await remotes.findById(remoteID);

        if (!remoteData) {
            return res.status(400).json({ message: "Could not Find Data 😐" });
        }

        const deletedRemote = await remotes.findByIdAndDelete({ _id: remoteID, creatorID : adminID }, remoteData, { new: true });

        res.status(200).json({ message: "Remote Deleted Successfully ", deleted: deletedRemote });
    } catch (err) {
        res.status(500).json({ message: "Server Error ", err });
    }
}

module.exports = deleteRemote;