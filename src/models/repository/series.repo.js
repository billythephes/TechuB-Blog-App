const seriesModel = require('../series.model')

class SeriesRepository {

    static async createNewSeries(newSeriesObject) {
        return await seriesModel.create(newSeriesObject)
    }

    static async findSeriesById(seriesId) {
        return await seriesModel.findById(seriesId).lean()
    }

    static async addPostsIntoSeries(filter, postIds) {
        return await seriesModel.findOneAndUpdate({ ...filter }, {
            $addToSet: {
                series_post_ids: { $each: postIds }
            }
        }, { new: true }).lean()
    }

    static async removePostsFromSeries(filter, postIds) {
        return await seriesModel.findOneAndUpdate({ ...filter }, {
            $pull: {
                series_post_ids: { $in: postIds }
            }
        }, { new: true }).lean();
    }

    static async findOneSeries(filter, selectField = {}) {
        return await seriesModel.findOne(filter)
            .select(selectField)
            .lean()
    }

    static async findSeries(filter, limit = {}, skip = {}, selectFields = {}, sortOption = {}) {
        const scoreOption = "$text" in filter ? { score: { '$meta': 'textScore' } } : {}
        return await seriesModel.find(filter, { ...scoreOption })
            .skip(skip)
            .limit(limit)
            .select(selectFields)
            .sort(sortOption)
            .lean()
    }

    static async deleteSeriesById(seriesId) {
        return await seriesModel.findByIdAndDelete(seriesId).lean()
    }

    static async updateSeriesById(seriesId, bodyUpdate, option) {
        return await seriesModel.findByIdAndUpdate(seriesId, {
            $set: bodyUpdate
        }, {
            ...option
        }).lean()
    }

}

module.exports = SeriesRepository