import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length } from 'class-validator';

const gameBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
  ]
  
@Entity()
export default class Game extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Length(2, 25)
    @Column('text', {nullable:false})
    name: string

    @Column('text', {nullable:false})
    color: string

    @Column('json', {default: gameBoard})
    gameBoard: JSON

}










// https://github.com/typeorm/typeorm/issues/150 the boardGame can be defined if a default value is assigned
//cool stuff about validator https://github.com/typestack/class-validator#validation-decorators