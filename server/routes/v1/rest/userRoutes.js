const Router = require('express');
const router = new Router();
const UserController = require('../../../controllers/v1/userContorller');

router.post('/registration', UserController.registrationNewUser);
router.patch('/info/:uid', UserController.getUserInfoByUid);
router.get('/all/:userId', UserController.getAllUser);
router.get('/profile/:targetUserId', UserController.getProfileInfoByUserId);
router.get('/histories/:userId', UserController.getGameHistoryByUserId);
router.get('/rating/:userId', UserController.getUserRating);

module.exports = router;
