import {Router} from 'express'

import UserController from './controllers/User'
import login from './controllers/login'
import authMiddleware from './middlewares/authMiddlewares'

const router = Router()

router.post('/user',UserController.create)
router.get('/users',authMiddleware,UserController.getAllUsers)
router.get('/user/:id',authMiddleware,UserController.findForId)
router.post('/userLogin',login.authenticate)
router.delete('/user/:id',authMiddleware,UserController.deleteUser)
router.put('/user/:id',UserController.editUser)



export default router;