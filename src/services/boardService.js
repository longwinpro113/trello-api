import { slugify } from '~/utils/formatters.js'
import { boardModel } from '~/models/boardModel.js'
import ApiError  from '~/utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
    try {
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        }

        // Gọi tới model để xử lý lưu bản ghi newBoard vào trong database
        const createdBoard = await boardModel.createNew(newBoard)

        // const getnewBoard = await boardModel.findOneById(createdBoard.insertedId)
        // console.log(getnewBoard)
        return await boardModel.findOneById(createdBoard.insertedId)

        // Trả kết quả về cho controller, trong Service luôn phải return kết quả

    } catch (error) { throw error }
}

const getDetails = async (boardId) => {
    try {
        const board = await boardModel.getDetails(boardId)
        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
        }

        const resBoard = cloneDeep(board)
        
        // Đưa các card vào đúng columns
        resBoard.columns.forEach(column => {
            // Cách dùng equals khi so sánh ObjectId trong MongoDB có support sẵn
            // column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

            // Cách đơn giản convert ObjectId về string rồi so sánh
            column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
        }) 

        // Xoá mảng cards khỏi board ban đầu
        delete resBoard.cards

        return resBoard        

    } catch (error) { throw error }
}

export const boardService = {
    createNew,
    getDetails
}