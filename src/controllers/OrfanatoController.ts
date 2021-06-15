import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Orfanato from '../models/Orfanato';

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
        const orfanato = await orfanatoRepositorio.findOneOrFail(id, { relations:['imagens']});

        return res.status(200).json(orfanato)
    },

    async list(req: Request, res: Response) {
        const orfanatoRepositorio = getRepository(Orfanato)
        const orfanatoById = await orfanatoRepositorio.find({
            relations: ['imagens']
        });

        return res.status(200).json(orfanatoById)
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
            return {path: _.filename}
        })

        const orfanato = orfanatoRepositorio.create({
            nome,
            latitude,
            longitude,
            about,
            instrucao,
            aberto_fds,
            horario_atendimento,
            imagens:imgs
        })

        await orfanatoRepositorio.save(orfanato)

        return res.status(201).json(orfanato)
    }
}