import { Console } from 'console'
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
    try {
        // console.log('req.body: ',req.body)
        //Example URL : http://localhost:3000/v1/boards?title=Test Board&description=Board 01 description
        // console.log('req.query: ',req.query)
        // console.log('req.params: ',req.params)
        // console.log('req.files: ',req.files)
        // console.log('req.cookies: ',req.cookies)
        // console.log('req.jwtDecoded: ',req.jwtDecoded)
        
        // Điều hướng dữ liệu từ Controller sang Service để xử lý nghiệp vụ
        const createdBoard = await boardService.createNew(req.body)

        // Có kết quả trả về cho phía Client
        res.status(StatusCodes.CREATED).json(createdBoard)
    }   catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
    try {
        const boardId = req.params.id
        const board = await boardService.getDetails(boardId)

        res.status(StatusCodes.OK).json(board)
    }   catch (error) { next(error) }
}

export const boardController = {
    createNew,
    getDetails
}