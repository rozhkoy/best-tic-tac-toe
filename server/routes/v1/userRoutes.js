const Router = require('express');
const router = new Router();
const UserController = require('../../controllers/v1/userContorller');

router.post('/registration', UserController.registrationNewUser);
router.patch('/info/:userId', UserController.getUserInfoByUid);
router.patch('/all/:userId', UserController.getAllUser);
router.get('/profile/:userId', UserController.getProfileInfoByUserId);
router.get('/history/:userId', UserController.getGameHistoryByUserId);
router.get('/rating/:userId', UserController.getUserRating);

module.exports = router;
