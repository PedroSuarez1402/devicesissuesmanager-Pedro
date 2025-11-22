import express from "express";

import deviceRoute from './deviceRoutes.js'
import roomRoutes from './roomRoutes.js'
import issueRoutes from './issueRoutes.js'
import userRoutes from './userRoutes.js'
import authRoutes from './authRoutes.js'

const routes = (app) => {
    const router = express.Router()

    // Registrar los módulos de forma modular
    router.use('/auth', authRoutes)
    router.use('/devices', deviceRoute)
    router.use('/rooms', roomRoutes)
    router.use('/issues', issueRoutes)
    router.use('/users', userRoutes)

    // Prefijo global para tu API
    app.use('/api', router)
}

export default routes