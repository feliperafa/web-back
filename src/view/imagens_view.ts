import Imagem from '../models/Imagem';

export default {
    render(imagem: Imagem) {
        return {

            id: imagem.id,
            url:`http://localhost:3333/uploads/${imagem.path}`
        }
    },
    renderMany(imagens: Imagem[]){
        return imagens.map(_ => this.render(_))
    }
}