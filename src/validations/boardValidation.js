import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
    // Custom messages for validation errors
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title is not allow to be empty',
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must be at most 50 characters long',
            'string.trim': 'Title must not have leading or trailing whitespace' 
        }),
        description: Joi.string().required().min(3).max(256).trim().strict()
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        // If validation passes, call the next middleware
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
        // Alternatively, you can directly send the response here
    }

}

export const boardValidation = {
    createNew
}