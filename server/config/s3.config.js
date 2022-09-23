const AWS = require('aws-sdk')
const crypto = require('crypto')
const util = require('util')

const randomBytes = util.promisify(crypto.randomBytes)

// setup AWS variables
const region = "us-east-1"
const bucketName = process.env.AWS_BUCKET
const accessKeyId = process.env.AWS_KEY
const secretAccessKey = process.env.AWS_SECRET

// create new S3 object with AWS variables
const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

// retrieve signed promise URL for uploading picture
module.exports.generateUploadURL = async () => {
    const rawBytes = await randomBytes(32)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

// delete picture from s3 bucket
module.exports.deleteFile = async (fileName) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    }

    return await s3.deleteObject(deleteParams, function(err, data) {
        if (err) console.log(err, err.stack)
    })
}