const Router = require('express');
const router = new Router();
const FriendController = require('../../../controllers/v1/friendsController');
const authMiddleware = require('../../../middleware/authMiddleware');

router.post('/requests/send/:userId', authMiddleware, FriendController.sendInviteToFriendship);
router.patch('/requests/accept/:invitationId', authMiddleware, FriendController.acceptFriendshipInvite);
router.delete('/requests/reject/:invitationId', authMiddleware, FriendController.rejectFriendshipInvite);
router.get('/all/:userId', authMiddleware, FriendController.getAllFriends);
router.get('/requests/all/:userId', authMiddleware, FriendController.getAllRequestsForFriendship);

module.exports = router;
