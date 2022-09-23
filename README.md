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

### Built with

- MongoDB
- Express
- React
- Nodejs
- Tailwindcss