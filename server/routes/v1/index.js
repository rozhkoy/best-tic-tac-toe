const Router = require('express');
const router = new Router();
const userRoutes = require('./userRoutes');
const friendsRoutes = require('./friendsRotues');

router.use('/users', userRoutes);
router.use('/friends', friendsRoutes);

module.exports = router;
