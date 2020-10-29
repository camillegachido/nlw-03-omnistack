import { Request, Response} from 'express'
import { getRepository } from 'typeorm'
import orphanageView from '../views/orphanage_view'
import * as Yup from 'yup'

import authenticate from '../config/user'

import Orphanage from '../models/Orphanage'

export default{
    async show(req: Request, res: Response){
        const { id } = req.params
        const orphanagesRepositoy = getRepository(Orphanage)

        const orphanage = await orphanagesRepositoy.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(orphanageView.render(orphanage))

    },

    async index(req: Request, res: Response){
        const orphanagesRepositoy = getRepository(Orphanage)

        const orphanages = await orphanagesRepositoy.find({
            relations: ['images'],
            where: { is_pendent: false }
        })

        return res.json(orphanageView.renderMany(orphanages))
    },

    async indexPendent(req: Request, res: Response){
        const orphanagesRepositoy = getRepository(Orphanage)

        const orphanages = await orphanagesRepositoy.find({
            relations: ['images'],
            where: { is_pendent: true }
        })

        return res.json(orphanageView.renderMany(orphanages))
    },

    async create(req: Request, res: Response){

        // const isLogado = authenticate(req)

        // if(isLogado == false){
        //    return res.status(400).send({ message: 'Não logado'})
        // }
        
        const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, whatsapp} = req.body

        const orphanagesRepositoy = getRepository(Orphanage)

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image =>{
            return { path: image.filename }
        })

        const data = {
            name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, images, whatsapp, is_pendent: true
        }
        
        const schema = Yup.object().shape({
            name: Yup.string().required(), 
            latitude: Yup.number().required(), 
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))
        })

        await schema.validate(data, {
            abortEarly: false
        })
        
        const orphanage = orphanagesRepositoy.create(
            data
        )

        await orphanagesRepositoy.save(orphanage)
        res.status(201).send(orphanage)
    },

    async putPendent(req: Request, res: Response){
        const isLogado = authenticate(req)

        if(isLogado == false){
           return res.status(400).send({ message: 'Não logado'})
        }

        const { id } = req.params; 
       
        const orphanagesRepositoy = getRepository(Orphanage)

        try{
            await orphanagesRepositoy.update({id: parseInt(id)}, { is_pendent: false })
            throw res.status(201).send({message: 'Atualizado'})
        }
        catch(err){
            throw res.status(400).send({ message: err} )
        }
    },

    async put(req: Request, res: Response){
        const isLogado = authenticate(req)

        if(isLogado == false){
           return res.status(400).send({ message: 'Não logado'})
        }

        const { id } = req.params; 
        const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, whatsapp} = req.body

        const orphanagesRepositoy = getRepository(Orphanage)

        try{
            await orphanagesRepositoy.update({id: parseInt(id)}, { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, whatsapp  })
            throw res.status(200).send({ name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, whatsapp  })
        }
        catch(err){
            throw res.status(400).send({ message: err} )
        }
    },

    async delete(req: Request, res: Response){
        const isLogado = authenticate(req)

        if(isLogado == false){
           return res.status(400).send({ message: 'Não logado'})
        }

        const { id } = req.params; 

        const orphanagesRepositoy = getRepository(Orphanage)

        try{
            await orphanagesRepositoy.delete(id)
        }
        catch(err){
            throw res.status(400).send({ message: err} )
        }
    }
}