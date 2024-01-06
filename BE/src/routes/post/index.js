const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const postController = require('../../controllers/post.contronller')
const commentController = require('../../controllers/comment.controller')
const likeController = require('../../controllers/like.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const PostValidator = require('../../middleware/validator/post.validator')
const { autherizePermission } = require('../../middleware/auth/checkPermission')
const { Permission } = require('../../utils/role.utils')

router.post('/', catchError(autherizeAccessToken), catchError(PostValidator.createPostValidator), catchError(postController.createNewPost))
router.get('/', /*catchError(autherizeAccessToken),*/ catchError(postController.getAllPost))
router.patch('/:id/status', catchError(autherizeAccessToken), catchError(autherizePermission(Permission.ADMIN)), catchError(postController.updateStatusOfPost))
router.get('/:id/comments', catchError(autherizeAccessToken), catchError(commentController.getAllCommentHistoryOfOfPost))
router.get('/:id/likes', catchError(autherizeAccessToken), catchError(likeController.findAllLikeOfPost))
router.patch('/:id', catchError(autherizeAccessToken), catchError(PostValidator.updatePostValidator), catchError(postController.updateGeneralInformationOfPost))
router.get('/:id', catchError(autherizeAccessToken), catchError(postController.getPost))


module.exports = router