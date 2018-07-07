import { JsonController, Get, Body, Post, Param } from 'routing-controllers'
import Game from './entity'

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ) {
        return Game.findOne(id)
    }

    @Get('/games')
    async allGames() {
        const games = await Game.find()
    
        return { games }
    }

    @Post('/games')
    async createGame(
        @Body() game: Game
    ) {
        const {...rest} = game
        const entity = Game.create(rest)
        return entity.save()
    }

}
