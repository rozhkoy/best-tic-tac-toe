const Router = require('express');
const router = new Router();
const FriendController = require('../../../controllers/v1/friendsController');

router.post('/requests/send/:userId', FriendController.sendInviteToFriendship);
router.patch('/requests/accept/:invitationId', FriendController.acceptFriendshipInvite);
router.delete('/requests/reject/:invitationId', FriendController.rejectFriendshipInvite);
router.get('/all/:userId', FriendController.getAllFriends);
router.get('/requests/all/:userId', FriendController.getAllRequestsForFriendship);

module.exports = router;
