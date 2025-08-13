import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
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
        console.log(req.body)

        await correctCondition.validateAsync(req.body, { abortEarly: false })
        // next()

        res.status(StatusCodes.CREATED).json({ message: 'POST from validation: API get list boards' })

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }

}

export const boardValidation = {
    createNew
}