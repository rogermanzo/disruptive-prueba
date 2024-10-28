const express = require('express');
const multer = require("multer");

const router = express.Router();
const userController = require('./users/user.controller');
const loginController = require('./login/login.controller');
const auth = require('../auth/auth');
const thematicController = require('./thematic/thematic.controller');
const categoryController = require('./category/category.controller');
const contentController = require('./content/content.controller');
const upload = require('../middleware/upload');

// login
router.post('/login', loginController.loginAuth);

// users
router.post('/users', /*auth.authenticate, auth.authorize,*/ userController.createUser);
router.get('/users/me', auth.returnMe, userController.usersMe);

//router.put('/users', auth.authenticate, auth.authorize, userController.updateUser);

// thematic
router.post('/thematic', auth.authenticate, auth.authorize, thematicController.createThematic);
router.get('/thematics', auth.authenticate, auth.authorize, thematicController.getThematics);
router.get('/thematic/:id', auth.authenticate, auth.authorize, thematicController.getThematicById);
router.put('/thematic/:id', auth.authenticate, auth.authorize, thematicController.updateThematic);
router.delete('/thematic/:id', auth.authenticate, auth.authorize, thematicController.deleteThematic);

//category
router.post('/category', auth.authenticate, auth.authorize, categoryController.createCategory);
router.get('/categories', auth.authenticate, auth.authorize, categoryController.getCategories);
router.get('/category/:id', auth.authenticate, auth.authorize, categoryController.getCategoryById);
router.get('/categories/deleted', auth.authenticate, auth.onlyAdmin, categoryController.getCategoriesDeleted);
router.get('/category/deleted/:id', auth.authenticate, auth.onlyAdmin, categoryController.getCategoryByIdDeleted);
router.delete('/category/:id', auth.authenticate, auth.authorize, categoryController.deleteCategory);

//content
router.post('/content', upload.array('files'), auth.authenticate, auth.authorize, contentController.createContent);
router.get('/contents', auth.authenticate, auth.authorize, contentController.getContents);
router.get('/content/:id', auth.authenticate, auth.authorize, contentController.getContentById);
router.put('/content/:id', upload.array('files'), auth.authenticate, auth.authorize, contentController.updateContent);
router.delete('/content/:id', auth.authenticate, auth.onlyAdmin, contentController.deleteContent);


module.exports = router;