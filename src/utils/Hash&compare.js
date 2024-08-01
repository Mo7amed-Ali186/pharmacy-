import bcrypt from 'bcryptjs';// npm i bcryptjs


export const hash = ({ plainText, saltRound = 8 } = {}) => {
    const hashResult = bcrypt.hashSync(plainText, saltRound )
    return hashResult
}


export const compare = ({ plainText, hashVlaue } = {}) => {
    const match = bcrypt.compareSync(plainText, hashVlaue)
    return match
} // ture or false
