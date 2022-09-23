## AWS S3 BUCKET get/pull/delete for images
This is a quick project I put together to learn how to use Amazon S3 Buckets to store images for my applications.

## Overview
The goal of the project was to successfully create an app that had the following requirements:

- User Login/Registration
- Add Profile Photo
  - Photos are stored in an Amazon S3 Bucket
  - Links to the photos are stored in the user document in MongoDB
- Delete Profile Photo from both AWS S3 and MongoDB
- Retrieve profile photo on user login

### Installation
1. Fork and Clone the repository
2. Install NPM packages in *BOTH* the Client & Server directories
3. Create a `.env` file in the **Server** directory with the following information:

- `ORIGIN=` Put the origin of your client ex:`http://localhost:3000`
- `PORT=` Port number your server (backend) will run on.  ex: `8000`
- `SECRETKEY=` = Secret key for the backend to use when authenticating users.
- `MONGO_URL=` URL path to your Mongo Database with the name of your database.  ex: `http://localhost/newdb`
- `AWS_KEY=` Enter the KEY of the user you create in AWS IAM
- `AWS_SECRET=` Enter the SECRET of the suer you create in AWS IAM
- `AWS_BUCKET=` Enter the name of the bucket you create in AWS S3

4. Create an AWS account if you don't already have one.  Once created edit the Bucket Policies as follows:

- For development *ONLY*.  Uncheck **Block all public access**.  In the future you will change this to only allow from the apps domain.

- Edit the **Bucket Policy**
```
{
    "Version": "2012-10-17",
    "Id": "Policy1663783993389",
    "Statement": [
        {
            "Sid": "Stmt1663783990969",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::test-image-upload-request/*"
        }
    ]
}
```
- Edit the **Cross-origin resource sharing (CORS)** section:
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "HEAD",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```
5. In AWS go to the IAM service and add a new user.  Add a policy for the user ensuring the following:
- Select the **S3** service
- In Actions select DeleteObject and PutObject
- Assign the policy to your AWS S3 BUCKET Resource.  Note: use the **ARN** `arn:aws:s3:::YOUR_AWS_BUCKET_NAME` after the 3 colons enter type the name of your colon.

### Continued development

- [ ] Add middleware using the **multer** library for uploading images and modifying image size prior to upload.
- [ ] Add the S3 Bucket to CDN for faster load times
- [ ] Add socket.io and add messaging capabilities
- [ ] Update interface and add in a dashboard, user profile section, and a place to view/send messages.

### Built with

- MongoDB
- Express
- React
- Nodejs
- Tailwindcss