import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, IsJSON } from 'class-validator';


@Entity()
export default class Game extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Length(2, 25)
    @Column('text', {nullable:false})
    name: string

    @IsString()
    @Length(2, 25)
    @Column('text', {nullable:false})
    color: string

    @IsJSON()
    @Column('json', {nullable:false})
    board: string[][]

}