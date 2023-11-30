const Router = require('express');
const router = new Router();
const FriendController = require('../../../controllers/v1/friendsController');

router.post('/request/send/:userId', FriendController.sendInviteToFriendship);
router.patch('/request/accept/', FriendController.acceptFriendshipInvite);
router.delete('/request/reject', FriendController.rejectFriendshipInvite);
router.get('/all/:userId', FriendController.getAllFriends);
router.get('/request/all/:userId', FriendController.getAllRequestsForFriendship);

module.exports = router;
