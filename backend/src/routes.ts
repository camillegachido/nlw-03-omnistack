import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphanageController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages-pendent', OrphanageController.indexPendent)
routes.get('/orphanages', OrphanageController.index)
routes.get('/orphanages/:id', OrphanageController.show)
routes.put('/orphanages/:id', OrphanageController.put)
routes.delete('/orphanages/:id', OrphanageController.delete)
routes.post('/orphanages', upload.array('images'), OrphanageController.create)

routes.put('/authorize-orphanage/:id', OrphanageController.putPendent)


import UserController from './controllers/UsersController'
routes.post('/users', UserController.create)
routes.post('/login', UserController.login)
routes.post('/forgot-password', UserController.forgotpassword)
routes.post('/reset-password', UserController.resetpassword)
export default routes