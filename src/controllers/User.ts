import User from '../models/User';
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';


class UserController{

   async create(req:Request, res:Response){
      try{
        const salt = bcrypt.genSaltSync(10)
        let {name,email,password} = req.body
        const user = await User.findOne({where: {email}})
        

        if(!name || !email){
            return res.sendStatus(400)
        }
        if(user == null){
          password =  bcrypt.hashSync(password,salt)
          await User.create({name,email,password})
          return res.sendStatus(200)
        }
        else{
          res.sendStatus(422)
        }
        
        
        

      }catch{
        return res.json({error:"error"})
      }
    }

    async findForId(req: Request, res: Response){
        try{
          const {id} = req.params
          const user = await User.findOne({where:{id}})

        if(!user){
          res.sendStatus(204)
        }
        else{
          return res.json(user)
        }

        }catch{
          return res.sendStatus(404)
        }
    }

    async getAllUsers(req: Request,res: Response){
        try{
            const users = await User.findAll({order:[['id','DESC']]})

            return res.json(users)

        }catch{
          res.sendStatus(404)
        }
    }

    async editUser(req: Request, res: Response){
      try{
        let {name,email,password} = req.body
        const {id} = req.params
        const user = await User.findOne({where:{id}})
        const salt = bcrypt.genSaltSync(10)
        const userEmail = await User.findOne({where:{email}})

        if(!user){
          res.sendStatus(204)
        }
        if(!name || !email || !password){
          res.sendStatus(400)
        }
        else if(userEmail && user.id!= userEmail.id){
          res.sendStatus(422)
        }
        else{
          password = bcrypt.hashSync(password,salt)
          await User.update({name,email,password},{where:{id}})
          return res.sendStatus(200)
        }

      }catch{
        res.sendStatus(404)
      }
    }

    async deleteUser(req: Request, res: Response){
      try{
        const {id} = req.params
        const user = await User.findOne({where: {id}})

        if(!user){
          return res.sendStatus(204)
        }else{
         await User.destroy({where: {id:user.id}})

         return res.sendStatus(200)
        }
       

      }catch{
        return res.sendStatus(404)
      }
    }
}

export default new UserController()


