const Router = require('express');
const router = new Router();
const UserController = require('../../../controllers/v1/userContorller');
const authMiddleware = require('../../../middleware/authMiddleware');

router.post('/registration', UserController.registrationNewUser);
router.patch('/info/:uid', authMiddleware, UserController.getUserInfoByUid);
router.get('/all/:userId', authMiddleware, UserController.getAllUser);
router.get('/profile/:targetUserId', authMiddleware, UserController.getProfileInfoByUserId);
router.get('/histories/:userId', authMiddleware, UserController.getGameHistoryByUserId);
router.get('/rating/:userId', authMiddleware, UserController.getUserRating);

module.exports = router;
