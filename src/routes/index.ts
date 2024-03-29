import authController from '../controllers/auth.controller'
import {CustomRoute} from '../utils/routes/custom-router'

const router = new CustomRoute()

router.GET('/nonce', authController.nonce)
router.POST('/login', authController.login)

export default router.getRouter()
