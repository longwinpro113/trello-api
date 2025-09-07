import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
    try {
        // console.log('req.body: ',req.body)
        //Example URL : http://localhost:3000/v1/boards?title=Test Board&description=Board 01 description
        // console.log('req.query: ',req.query)
        // console.log('req.params: ',req.params)
        // console.log('req.files: ',req.files)
        // console.log('req.cookies: ',req.cookies)
        // console.log('req.jwtDecoded: ',req.jwtDecoded)

        res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API get list boards' })
    } catch (error) { 
        next(error) 
    }
}

export const boardController = {
    createNew
}