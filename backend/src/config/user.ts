import { Request} from 'express'
import { verify } from 'jsonwebtoken'

interface responseToken {
    iat: number;
    exp: number;
    sub: string;
}

export default function authenticate(req: Request): boolean | string{
    const token = req.headers.authorization
     console.log(token)

     if(!token)
        return false
    
    try{
        const [, tokenOfic] = token.split(' ')
        
        const isMyToken  = verify(tokenOfic, 'jdsadsdsad')

        const { sub } = isMyToken as responseToken
        return sub
    }   
    catch{
        return false
    }
    
}