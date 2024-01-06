const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const likeController = require('../../controllers/like.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')

router.post('/', catchError(autherizeAccessToken), catchError(likeController.likePost))
router.delete('/:id', catchError(autherizeAccessToken), catchError(likeController.unLikePost))
router.get('/user', catchError(autherizeAccessToken), catchError(likeController.findAllLikeOfUser))

module.exports = router
