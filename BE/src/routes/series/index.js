const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const seriesController = require('../../controllers/series.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const seriesValidator = require('../../middleware/validator/series.validator')

router.post('/', catchError(autherizeAccessToken), catchError(seriesValidator.createSeriesValidator), catchError(seriesController.createNewSeries))
router.delete('/:id', catchError(autherizeAccessToken), catchError(seriesController.deleteSeries))
router.post('/:id/posts', catchError(autherizeAccessToken), catchError(seriesController.addPostsIntoSeries))
router.delete('/:id/posts', catchError(autherizeAccessToken), catchError(seriesController.removePostsFromSeries))
router.get('/', catchError(autherizeAccessToken), catchError(seriesController.findAllSeries))
router.patch('/:id', catchError(autherizeAccessToken), catchError(seriesValidator.updateSeriesValidator), catchError(seriesController.updateSeries))
module.exports = router