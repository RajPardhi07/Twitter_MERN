


import express from 'express'
import { addCommentController, createTweetController, deleteTweetController, getAllTweets, getCommentsController, getFollowingTweets, likeOrDislike, UserTweetController } from '../controller/tweetController.js';
import isAuthenticated from '../config/auth.js';

const router = express.Router();


// http://localhost:8080/api/tweet/createTweet
router.post('/createTweet', isAuthenticated, createTweetController);


// http://localhost:8080/api/tweet/deleteTweet
router.delete('/deleteTweet/:id', isAuthenticated, deleteTweetController);


// http://localhost:8080/api/tweet/likeOrDislike/:id
router.put('/likeOrDislike/:id', isAuthenticated, likeOrDislike);

router.post('/tweets/:tweetId/comments', addCommentController);

router.get('/tweets/:tweetId/comments', getCommentsController);


router.get('/alltweets/:id', isAuthenticated, getAllTweets);

router.get('/followingtweets/:id', isAuthenticated, getFollowingTweets);

router.get('/mytweet/:id', UserTweetController);

export default router;