
import { object, string, number, TypeOf, date, array, z } from "zod"


//saveGames({ ...games, [`Game-${Object.keys(games).length + 1}-${winner}-${Number(boardSize)}-${date}`]: finalArray })
const players = {
    PlayerOne: "Black",
    PlayerTwo: "White",
} as const;

const winners = {
    PlayerOne: "Black",
    PlayerTwo: "White",
    Tie: "Tie"
} as const;


const payload = {
    body: object({
        userId: string({
            required_error: "User id is required",
        }),
        gameOver: z.boolean(),
        gameArray_PlayerOne: array(z.array(number())),
        gameArray_PlayerTwo: array(z.array(number())),
        gameArray: array(z.array(number())),
        currentPlayer: z.nativeEnum(players),
        winner: z.nativeEnum(winners).optional(),
        boardSize: number({
            required_error: "Board size is required",
        }),

    })
}

const getParams = {
    params: object({
        id: string({
            required_error: "Game id is required",
        }),
    }),
}

const updateDeleteParams = {
    params: object({
        id: string({
            required_error: "Game id is required",
        }),
    }),
}

export const createGameSchema = object({
    ...payload
})
export const updateGameSchema = object({
    ...payload,
    ...updateDeleteParams
})
export const getGameSchema = object({
    ...getParams
})
export const deleteGameSchema = object({
    ...updateDeleteParams
})


export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type DeleteGamesInput = TypeOf<typeof deleteGameSchema>;
export type ReadGameInput = TypeOf<typeof getGameSchema>;