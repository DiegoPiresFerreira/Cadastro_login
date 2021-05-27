import {Request, Response} from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'

class authController{

    async authenticate(req: Request, res: Response){
        
       try{
        let {email, password} = req.body
        const user = await User.findOne({where:{email}})
        const isValid =  bcrypt.compareSync(password,user.password)

        if(!user){
            res.sendStatus(401)
        }
        else{

            if(isValid) {
                const token = jwt.sign({id:user.id, email: user.email},'secreto', {expiresIn:'1d'})
                return res.json({user,token}) 
            }

        }
       
        
       }catch{
        res.sendStatus(400)
       }
    
    }
   
}

export default new authController()