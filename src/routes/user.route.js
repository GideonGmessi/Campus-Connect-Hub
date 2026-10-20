const router = require('express').Router();
const validate = require('../middlewares/validate.middleware');
const validateObjectId = require('../middlewares/validateObjectId');
const authorize = require('../middlewares/authorize.middleware');
const { protect } = require('../middlewares/auth.middleware');
const {
  updateProfileSchema, roleSchema, statusSchema, listQuerySchema,
} = require('../middlewares/schemas/user.schema');
const ctrl = require('../controllers/user.controller');

router.use(protect); // every user route needs a valid, non-suspended login

router.get('/me', ctrl.getMe);
router.patch('/me', validate(updateProfileSchema), ctrl.updateMe);

router.get('/', authorize('admin'), validate(listQuerySchema, 'query'), ctrl.list);
router.get('/:id', authorize('admin'), validateObjectId(), ctrl.getById);
router.patch('/:id/role', authorize('admin'), validateObjectId(), validate(roleSchema), ctrl.updateRole);
router.patch('/:id/status', authorize('admin'), validateObjectId(), validate(statusSchema), ctrl.updateStatus);

module.exports = router;