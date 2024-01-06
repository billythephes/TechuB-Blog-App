const categoryModel = require('../category.model')

class CategoryRepository {

    static async findCategory(filter) {
        return categoryModel.findOne(filter).lean()
    }

    static async findCategories(filter, selectField = {}) {
        return categoryModel.find(filter).select(selectField).lean()
    }

    static async createNewCategory(name, description) {
        const newCategory = {
            category_name: name,
            category_description: description
        }
        return await categoryModel.create(newCategory)
    }

    static async removeCategory(filter) {
        return await categoryModel.findOneAndDelete(filter)
    }

    static async updateCategory(filter, newCategory, option) {
        return await categoryModel.findOneAndUpdate(filter, {
            $set: {
                ...newCategory
            }
        }, {
            ...option
        })
    }

    static async updateCategorys(filter, updateObject, option) {
        return await categoryModel.updateMany(filter, {
                ...updateObject
        }, {
            ...option
        })
    }

    // Category không nhiều nên không cần limit và skip
    static async findAllCategory(selectField) {
        return await categoryModel.find({}).select(selectField).lean()
    }

}

module.exports = CategoryRepository