import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Imagem from './Imagem'

@Entity('Orfanatos')
export default class Orfanato{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    nome:string;

    @Column()
    latitude:number;

    @Column()
    longitude:number;

    @Column()
    about:string;

    @Column()
    instrucao:string;

    @Column()
    aberto_fds:boolean;

    @Column()
    horario_atendimento:string;

    @OneToMany(() => Imagem, imagens => imagens.orfanato, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orfanato_id' })
    imagens: Imagem[]

}