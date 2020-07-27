const router = require('express').Router();

const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction
} = require('../../controllers/thoughts-controller');

// router.route('/:userId').post(addThought);
router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:id/reaction')
    .get(addReaction);

router
    .route('/:userId')
    // .get(getThoughtById)
    .post(addThought);

module.exports = router;