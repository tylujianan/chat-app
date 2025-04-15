import jwt from 'jsonwebtoken';

const generateTokenSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,  //防止xss攻击，cookie只能通过http访问，不能通过js访问
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    }); // 1 day expiration time in milliseconds
}

export default generateTokenSetCookie;