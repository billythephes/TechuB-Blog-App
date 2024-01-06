const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const commentController = require('../../controllers/comment.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const { commentPostValidator } = require('../../middleware/validator/comment.validator')


router.post('/', catchError(autherizeAccessToken), catchError(commentPostValidator), catchError(commentController.commentPost))
router.delete('/:id', catchError(autherizeAccessToken), catchError(commentController.unCommentPost))
router.get('/post/:id', catchError(autherizeAccessToken), catchError(commentController.getAllCommentHistoryOfOfPost))

module.exports = router