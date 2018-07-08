import { JsonController, Get, Body, Post, Param, NotFoundError, Put, NotAcceptableError, BadRequestError, HttpCode } from 'routing-controllers'
import Game from './entity'

const givenColors = ["green", "blue", "red", "yellow", "magenta"]

const getColor = () => {
   const randomColor = givenColors[Math.floor(Math.random() * givenColors.length)]
    return randomColor}

    const moves = (board1, board2) => 
    board1
      .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
      .reduce((a, b) => a.concat(b))
      .length
  

@JsonController()
export default class GameController {

    @Get('/games')
    @HttpCode(201)
    async allGames() {
        const games = await Game.find()
        return { games }
    }

    @Post('/games')
    createGame(
      @Body() game: Game
    ) {
      game.color = getColor()
      return game.save()
    }

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ) {
        const game = Game.findOne(id);
        if (!game) throw new NotFoundError('There is no game with such ID!')
        return game
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('There is no game with such ID!')
    if (!update.name) throw new NotAcceptableError('YOU NEED TO INSERT A NAME!')
    if (!update.color) throw new NotAcceptableError('COLOR CAN NOT BE EMPTY!')
    if (!givenColors.includes(update.color)) throw new BadRequestError('THIS COLOR IS NOT PART OF THE LIST!')
    if (!update.gameBoard) throw new BadRequestError('BOARD SHOULD BE HERE')
    if (moves(game.gameBoard, update.gameBoard) > 1) throw new BadRequestError('ONLY ONE MOVE PLEASE!')
    return Game.merge(game, update).save()
    }
}

