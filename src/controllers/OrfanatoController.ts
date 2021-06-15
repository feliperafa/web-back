import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Orfanato from '../models/Orfanato';
import orfanatoview from '../view/orfanato_view';
import * as Yup from 'yup'



export default {
    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const orfanatoRepositorio = getRepository(Orfanato)
        const orfanatoRemoveById = await orfanatoRepositorio.delete(id);

        return res.status(200).json(orfanatoRemoveById)
    },

    async listById(req: Request, res: Response) {
        const { id } = req.params;

        const orfanatoRepositorio = getRepository(Orfanato)

        const orfanatosById = await orfanatoRepositorio.findOneOrFail(id, { relations: ['imagens'] });

        return res.json(orfanatoview.render(orfanatosById))
    },

    async list(req: Request, res: Response) {
        const orfanatoRepositorio = getRepository(Orfanato)
        const orfanatoListAll = await orfanatoRepositorio.find({
            relations: ['imagens']
        });

        return res.json(orfanatoview.renderMany(orfanatoListAll))
    },

    async create(req: Request, res: Response) {

        const {
            nome,
            latitude,
            longitude,
            about,
            instrucao,
            aberto_fds,
            horario_atendimento,
        } = req.body;

        const orfanatoRepositorio = getRepository(Orfanato)

        const reqImagens = req.files as Express.Multer.File[];

        const imgs = reqImagens.map((_) => {
            return { path: _.filename }
        })

        const data = {
            nome,
            latitude,
            longitude,
            about,
            instrucao,
            aberto_fds,
            horario_atendimento,
            imagens: imgs
        }
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instrucao: Yup.string().required(),
            aberto_fds: Yup.boolean().required(),
            horario_atendimento: Yup.string().required(),
            imagens: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, { abortEarly: false })

        const orfanato = orfanatoRepositorio.create(data)

        await orfanatoRepositorio.save(orfanato)

        return res.status(201).json(orfanato)
    }
}