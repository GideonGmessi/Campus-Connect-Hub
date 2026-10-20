const router = require('express').Router();
const validate = require('../middlewares/validate.middleware');
const {protect} = require('../middlewares/auth.middleware');
const { registerSchema, loginSchema, changePasswordSchema } = require('../middlewares/schemas/auth.schema');
const auth = require('../controllers/auth.controller');

router.post('/register', validate(registerSchema), auth.register);
router.post('/login', validate(loginSchema), auth.login);

router.get('/me', ...protect, auth.me);
router.patch('/change-password', ...protect, validate(changePasswordSchema), auth.changePassword);
router.post('/logout', ...protect, auth.logout);

module.exports = router;  