const UserController = require('../controllers/user.controller');
const s3Bucket = require('../controllers/s3.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    app.get('/s3Url', authenticate, s3Bucket.getS3URL);
    // app.get('/api/users', authenticate, UserController.getAllUsers);
    app.get('/api/users/getUser', authenticate, UserController.getLoggedInUser)
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.put('/api/users/profilePicture/:id', authenticate, UserController.updateProfilePicture)
    app.delete('/s3image/delete/:imageName', authenticate, s3Bucket.deleteS3File)
}