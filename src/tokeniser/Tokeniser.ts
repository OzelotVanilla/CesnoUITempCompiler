import { Result } from "../util/Result"
import { TokenType } from "./TokenType"

export class Tokeniser
{
    private args: Tokeniser_Args

    constructor(args?: Tokeniser_Args)
    {
        this.args = args ?? {}
    }

    public parse(code: string) //: Result<TokeniseResult, TokeniseError>
    {

    }
}

export type Tokeniser_Args = {}

export type Token = {
    /** Type of the token. */
    type: TokenType
    /** The content of that token stored in a string. */
    content: string
    /** Human readable row position of token's first character. */
    position_row: number
    /** Human readable column position of token's first character. */
    position_col: number
    /** The offset to find token's first character, regarding to the source code. */
    position_offset: number
}

export type TokeniseResult = {
    /** Parsed token. */
    tokens: Token[]
    /** The inputted source code */
    source_code: string
    /** Consumed time for tokenising (in milliseconds). */
    time_consumed: number
}

type TokeniseError = {
    // TODO:
}