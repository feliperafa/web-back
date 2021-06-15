import Orfanato from '../models/Orfanato';
import imagensView from './imagens_view'

export default {
    render(orfanato: Orfanato) {
        return {

            id: orfanato.id,
            nome: orfanato.nome,
            latitude: orfanato.latitude,
            longitude: orfanato.longitude,
            about: orfanato.about,
            instrucao: orfanato.instrucao,
            aberto_fds: orfanato.aberto_fds,
            horario_atendimento: orfanato.horario_atendimento,
            imagens:imagensView.renderMany(orfanato.imagens)
        }
    },
    renderMany(orfanatos: Orfanato[]){
        return orfanatos.map(_ => this.render(_))
    }
}