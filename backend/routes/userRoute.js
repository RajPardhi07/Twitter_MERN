import express from 'express'
import { bookmarks, editController, followController, getMyBookmark, getMyProfile, getOtherUsers, getSingleUser, loginController, logoutController, registerController, unfollowController } from '../controller/userController.js';
import isAuthenticated from '../config/auth.js';

const router = express.Router();


// http://localhost:8080//api/user/register
router.post("/register", registerController);



// http://localhost:8080/api/user/login
router.post("/login", loginController);


// http://localhost:8080/api/user/logout
router.get("/logout", logoutController);

router.post("/edit/:id", editController);

router.get('/singleuser/:id', getSingleUser);


router.put('/bookmark/:id', isAuthenticated, bookmarks);


// http://localhost:8080/api/user/getBookmark/:id
router.get('/getBookmark/:id', getMyBookmark);

// http://localhost:8080/api/user/getmyProfile/:id
router.get('/getmyProfile/:id', isAuthenticated, getMyProfile);

router.get('/otheruser/:id', isAuthenticated, getOtherUsers)


// http://localhost:8080/api/user/follow/:id
router.post('/follow/:id', isAuthenticated, followController)



// http://localhost:8080/api/user/unfollow/:id
router.post('/unfollow/:id', isAuthenticated, unfollowController)


export default router;