const express = require('express');
const userRoutes = require('../services/user/user.routes.js');
const authRoutes = require('../services/auth/auth.routes');
const formRoutes = require('../services/form.generator/form.routes');
const categoryRoutes = require('../services/categories/categories.routes.js');
const divisionRoutes = require('../services/divisions/divisions.routes.js');
const submissionRoutes = require('../services/submissions/submissions.routes.js');
const documentRoutes = require('../services/documents/documents.routes.js');
const authMiddleWare = require('../middlewares/authMiddleware.js');
const router = express.Router();

// Define route modules
router.use('/login', authRoutes); // /api/login
router.use('/users', authMiddleWare,  userRoutes); // middleware temporarily disabled for testing purposes
router.use('/form', authMiddleWare,  formRoutes); //middleware temporarily disabled for testing purposes
router.use('/categories', authMiddleWare,  categoryRoutes);
router.use('/divisions', authMiddleWare,  divisionRoutes);
router.use('/submissions', authMiddleWare,  submissionRoutes);
router.use('/documents', authMiddleWare,  documentRoutes);


module.exports = router;
