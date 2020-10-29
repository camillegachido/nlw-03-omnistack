import { Request, Response} from 'express'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import * as Yup from 'yup'

export default{
    async show(req: Request, res: Response){
        const usersRepository = getRepository(User)
    },

    async create(req: Request, res: Response){
        const {name, email, password } = req.body

        const usersRepository = getRepository(User)

        const data = {
            name, email, password,
        }
        
        const schema = Yup.object().shape({
            name: Yup.string().required(), 
            email: Yup.string().required(), 
            password: Yup.string().required(), 
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const cript = await hash(password, 8)

        const dt = {name, email, password: cript}
        const user = usersRepository.create(dt)

        await usersRepository.save(user)
        res.status(201).send(user)
    },

    async login(req: Request, res: Response){
        const {email, password } = req.body

        const usersRepository = getRepository(User)

        const data = {
             email, 
             password,
        }
        
        const schema = Yup.object().shape({
            email: Yup.string().required(), 
            password: Yup.string().required(), 
        })

        await schema.validate(data, {
            abortEarly: false
        })


        const user = await usersRepository.findOne({ where: { email } });
        
        if(!user){
            throw res.status(500).send({message: 'Invalid username or password'})
        }

        const pass = await compare(password, user.password)

        if(!pass){
            throw res.status(500).send({message: 'Invalid username or password'})
        }

        const token = sign({}, 'jdsadsdsad', {
            subject: user.email,
            expiresIn: '1d'
        })

        const sd = {name: user.name, token}
        res.status(201).send(sd)
    },

    async forgotpassword(req: Request, res: Response){
        const {email } = req.body


        const usersRepository = getRepository(User)

        const data = {
            email, 
        }
       
        const schema = Yup.object().shape({
            email: Yup.string().required(), 
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const user = await usersRepository.findOne({ where: { email } });
        
        if(!user){
            throw res.status(400).send({message: 'User not found'})
        }

        const token = sign({}, 'jdsadsdsad', {
            subject: user.email,
            expiresIn: '1d'
        })

        await usersRepository.update({ email: email }, { passwordResetToken: token })
        res.status(201).send({ message: 'Email enviado com sucesso'} )
    },

    async resetpassword(req: Request, res: Response){
        const { email, passwordResetToken, newPassword } = req.body

        const usersRepository = getRepository(User)

        const data = {
            email, 
            passwordResetToken, 
            newPassword
        }
       
        const schema = Yup.object().shape({
            email: Yup.string().required(), 
            passwordResetToken: Yup.string().required(), 
            newPassword: Yup.string().required(), 
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const user = await usersRepository.findOne({ where: { email } });
        
        if(!user){
            throw res.status(400).send({message: 'User not found'})
        }

        const cript = await hash(newPassword, 8)

        try{
            await usersRepository.update({ email: email, passwordResetToken: passwordResetToken }, { password: cript })
        }
        catch(err){
            throw res.status(400).send({ message: err} )
        }
        
        res.status(201).send({ message: 'Senha atualizada com sucesso'} )
    }
}