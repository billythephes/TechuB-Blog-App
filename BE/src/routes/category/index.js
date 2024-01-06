const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const categoryController = require('../../controllers/category.controller')
const { autherizeAccessToken } = require('../../middleware/auth/checkAuthentication')
const { autherizePermission } = require('../../middleware/auth/checkPermission')
const { Permission } = require('../../utils/role.utils')
const { createCategoryValidator, updateCategoryValidator } = require('../../middleware/validator/category.validator')


router.post('/', catchError(autherizeAccessToken), catchError(createCategoryValidator), catchError(autherizePermission(Permission.ADMIN)), catchError(categoryController.createNewCategory))
router.get('/', catchError(categoryController.getAllCategoty))
router.delete('/:id', catchError(autherizeAccessToken), catchError(autherizePermission(Permission.ADMIN)), catchError(categoryController.removeCategory))
router.patch('/:id', catchError(autherizeAccessToken), catchError(updateCategoryValidator), catchError(autherizePermission(Permission.ADMIN)), catchError(categoryController.updateCategory))


module.exports = router


