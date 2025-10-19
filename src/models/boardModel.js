import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from './columnModel.js'
import { cardModel } from './cardModel.js'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),

    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

    columnOrderIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    createdAt: Joi.date().default(() => Date.now()),
    updatedAt: Joi.date().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
    return await BOARD_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)

        // console.log('validData', validData)
        return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        // console.log(new ObjectId(id))
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

        return result
    } catch (error) { throw new Error(error) }
}

const getDetails = async (id) => {
    try {
        // console.log(new ObjectId(id))
        // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
            { $match: { 
                _id: new ObjectId(id),
                _destroy: false 
            } },

            { $lookup: {
                from: columnModel.COLUMN_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'boardId',
                as: 'columns'
            } },

            { $lookup: {
                from: cardModel.CARD_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'boardId',
                as: 'cards'
            } }
        ]).toArray()

        return result[0] || null
    } catch (error) { throw new Error(error) }
}


export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_SCHEMA,
    createNew,
    findOneById,
    getDetails
}