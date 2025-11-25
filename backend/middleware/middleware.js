import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authenticateToken = (req, res, next) => {
    const btoken = req.headers['authorization']
    console.log('btoken', btoken)

    if (!btoken) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = btoken.trim().replace(/^bearer\s+/i, '');
    console.log('token', token)

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        return true;
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

const authorizeRole = (allowdRoles) => {
    return (req, res, next)=>{
        const userRole = req.user.role 
        if(!allowdRoles.includes(userRole)){
            return res.status(403).json({message: 'You are not authorized to access this route'})
        }
        next()
    }
}

export {
    authenticateToken,
    authorizeRole
}