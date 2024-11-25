import { TokenType } from "./TokenType";

export type TokenInfo = { content: string | undefined, raw_content: string | undefined, token_type: TokenType | undefined, position_row: number | undefined, position_col: number | undefined, position_offset: number | undefined };

/**
 * A Token is a segment of code.
 */
export class Token
{

    /** The content of that token stored in a string. */
    public readonly content: string;
    /** The raw content of that token stored in a string which is directly copied from the souce code. */
    public readonly raw_content: string;

    /** Type of the token. */
    public readonly token_type: TokenType;

    /** Human readable 0-based row position of token's first character. */
    public readonly position_row: number;
    /** Human readable 0-based column position of token's first character. */
    public readonly position_col: number;
    /** The 0-based offset to find token's first character, regarding to the source code. */
    public readonly position_offset: number;

    public constructor(info: TokenInfo)
    {
        if ((info.content != undefined) && (info.raw_content != undefined) && (info.token_type != undefined) && (info.position_row != undefined) && (info.position_col != undefined) && (info.position_offset != undefined))
        {
            this.content = info.content;
            this.raw_content = info.raw_content;
            this.token_type = info.token_type;
            this.position_row = info.position_row;
            this.position_col = info.position_col;
            this.position_offset = info.position_offset;
        } else
        {
            throw new Error("All info of a Token must NOT be undefined.");
        }
    }

    /**
     * Length (in chars) of a token.
     */
    public get token_length(): number
    {
        return this.raw_content.length;
    }
}