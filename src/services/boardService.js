import { slugify } from '~/utils/formatters.js'

const createNew = async (reqBody) => {
    try {
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        }

        // Gọi tới model để xử lý lưu bản ghi newBoard vào trong database
        // ...

        return newBoard

        // Trả kết quả về cho controller, trong Service luôn phải return kết quả

    } catch (error) { throw error }
}

export const boardService = {
    createNew
}