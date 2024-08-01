import jwt from 'jsonwebtoken';

export const generateToken = ({ payload = {}, signature = "project2013" } = {}) => {
    const token = jwt.sign(payload, signature)
    return token
}


export const verifyToken = ({ token, signature = "project2013" } = {}) => {
    const decoded = jwt.verify(token, signature)
    return decoded
}