const s3 = require('../config/s3.config')

module.exports = {
    getS3URL: async (req, res) => {
        const url = await s3.generateUploadURL()
        res.send({url})
    },

    deleteS3File: async (req, res) => {
        await s3.deleteFile(req.params.imageName)
        res.send({message: "success"})
    }
}