const express = require('express');
const router = express.Router();
const upload = require('../middleware/imgUploadMiddleware');
const {
    getWaitlistItems,
    addFrame,
    addFork,
    addGroupset,
    addWheelset,
    addSeat,
    addCockpit,
    addHeadset,
    addHandlebar,
    addStem,
    addHubs,
    deleteWaitlistItem
} = require('../controllers/waitlistController');

router.get('/waitlist-item', getWaitlistItems);

router.post('/add-frame', upload.single('image'), addFrame);
router.post('/add-fork', upload.single('image'), addFork);
router.post('/add-groupset', upload.single('image'), addGroupset);
router.post('/add-wheelset', upload.single('image'), addWheelset);
router.post('/add-seat', upload.single('image'), addSeat);
router.post('/add-cockpit', upload.single('image'), addCockpit);
router.post('/add-headset', upload.single('image'), addHeadset);
router.post('/add-handlebar', upload.single('image'), addHandlebar);
router.post('/add-stem', upload.single('image'), addStem);
router.post('/add-hubs', upload.single('image'), addHubs);

router.put('/delete-item/:waitlist_item_id', deleteWaitlistItem);

module.exports = router;