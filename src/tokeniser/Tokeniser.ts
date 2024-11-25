import { Result } from "../util/Result"
import { DelimiterTokenType } from "./DelimiterTokenType";
import { FixedDelimiterTokenType } from "./FixedDelimiterTokenType"
import { RemainderTokenType } from "./RemainderTokenType";
import { Token, TokenInfo } from "./Token"
import { TokenType } from "./TokenType"

export class Tokeniser
{
    private args: Tokeniser_Args;

    private remainder_token_types: RemainderTokenType[];

    private fixed_delimiter_token_type_router: FixedDelimiterTokenTypeRouter;

    private other_delimiter_token_types: DelimiterTokenType[];

    constructor(args?: Tokeniser_Args)
    {
        this.args = args ?? {};
        this.remainder_token_types = [];
        this.other_delimiter_token_types = [];
        this.fixed_delimiter_token_type_router = new FixedDelimiterTokenTypeRouter();
    }

    public parse(code: string): Result<TokeniseResult, TokeniseError> //: Result<TokeniseResult, TokeniseError>
    {

        let time_start = new Date().getTime();

        let tokens: Token[] = [];

        main_loop_of_matching:
        for (let tokenise_index = new TokenComplexCoordinate(code), match_index = new TokenComplexCoordinate(code); match_index.index < code.length;)
        {
            let code_segment = code.slice(match_index.index);
            let match_succeed = false;
            let delimiter_token_info: TokenInfo = { content: undefined, raw_content: undefined, token_type: undefined, position_row: undefined, position_col: undefined, position_offset: undefined };

            for (let token_type of this.other_delimiter_token_types)
            {
                let match_result = token_type.matchAndGetContent(code_segment);
                if (match_result.isOk())
                {
                    match_succeed = true;
                    delimiter_token_info.content = match_result.unwrapOk().content;
                    delimiter_token_info.raw_content = match_result.unwrapOk().content;
                    delimiter_token_info.token_type = token_type;
                    break;
                }
            }
            if (!(match_succeed))
            {
                let match_result = this.fixed_delimiter_token_type_router.matchAndGetContentAndTokenType(code_segment);
                if (match_result.succeed)
                {
                    match_succeed = true;
                    delimiter_token_info.content = match_result.content;
                    delimiter_token_info.raw_content = match_result.content;
                    delimiter_token_info.token_type = match_result.token_type;
                }
            }
            if (!match_succeed)
            {
                match_index.index++;
                continue;
            }

            case_of_remainder_matching:
            if (match_index.index > tokenise_index.index)
            {
                let remainder = code.slice(tokenise_index.index, match_index.index);
                for (let remainder_token_type of this.remainder_token_types)
                {
                    let match_result = remainder_token_type.match(remainder);
                    if (match_result.isOk())
                    {
                        tokens.push(new Token({ content: match_result.unwrapOk(), raw_content: remainder, token_type: remainder_token_type, position_row: tokenise_index.position_row, position_col: tokenise_index.position_column, position_offset: tokenise_index.index }));
                        break case_of_remainder_matching;
                    }
                }
                return new Result(false, new TokeniseError("No TokenType for token \"" + remainder + "\"", tokenise_index.position_row, tokenise_index.position_column, tokenise_index.index, {raw_content: remainder}));
            }

            delimiter_token_info.position_row = match_index.position_row;
            delimiter_token_info.position_col = match_index.position_column;
            delimiter_token_info.position_offset = match_index.index;
            tokens.push(new Token(delimiter_token_info));


        }

        return new Result(true, { tokens: tokens, source_code: code, time_consumed: new Date().getTime() - time_start });
    }

    public addTokenType(token_type: TokenType)
    {
        if (token_type instanceof RemainderTokenType)
        {
            this.remainder_token_types.push(token_type);
            this.remainder_token_types.sort((x, y) => y.priority - x.priority);
        } else if (token_type instanceof DelimiterTokenType)
        {
            if (token_type instanceof FixedDelimiterTokenType)
            {
                this.fixed_delimiter_token_type_router.addFixedDelimiterTokenType(token_type);
            } else
            {
                this.other_delimiter_token_types.push(token_type);
            }
        } else
        {
            throw new TypeError("A TokenType can only be subclass of RemainderTokenType or DelimiterTokenType while creating subclass directly from TokenType isn't allowed.");
        }
    }
}

export type Tokeniser_Args = {}

export type TokeniseResult = {
    /** Parsed token. */
    tokens: Token[]
    /** The inputted source code */
    source_code: string
    /** Consumed time for tokenising (in milliseconds). */
    time_consumed: number
}

export class TokeniseError extends Error {

    /** Human readable 0-based row position of token's first character. */
    public readonly position_row: number;
    /** Human readable 0-based column position of token's first character. */
    public readonly position_col: number;
    /** The 0-based offset to find token's first character, regarding to the source code. */
    public readonly position_offset: number;

    public readonly token_content?: string;

    public readonly token_raw_content?: string;

    public constructor(message: string, position_row: number, position_col: number, position_offset: number, content?: {content?: string, raw_content?: string})
    {
        super(message);
        this.position_row = position_row;
        this.position_col = position_col;
        this.position_offset = position_offset;

        this.token_content = content?.content;
        this.token_raw_content = content?.raw_content;
    }
}

/** A non-exported class for accelirate matching of FixedDelimiterTokenType. */
class FixedDelimiterTokenTypeRouter
{
    private fixed_delimiter_token_types: Map<string, FixedDelimiterTokenType>[];

    private max_token_type_length: number;

    constructor()
    {
        this.fixed_delimiter_token_types = [];
        this.max_token_type_length = 0;
    }

    public addFixedDelimiterTokenTypes(...fixed_delimiter_token_types: FixedDelimiterTokenType[])
    {
        fixed_delimiter_token_types.forEach(token_type => this.addFixedDelimiterTokenType(token_type));
    }

    public addFixedDelimiterTokenType(fixed_delimiter_token_type: FixedDelimiterTokenType)
    {
        let current_fixed_delimiter_token_types_content_length = fixed_delimiter_token_type.content.length;
        for (let i = this.max_token_type_length; i < current_fixed_delimiter_token_types_content_length; i++)
        {
            this.fixed_delimiter_token_types.push(new Map());
        }

        this.fixed_delimiter_token_types[current_fixed_delimiter_token_types_content_length - 1].set(fixed_delimiter_token_type.content, fixed_delimiter_token_type);
    }

    public matchAndGetContentAndTokenType(code_segment: string): { succeed: false } | { succeed: true, content: string, token_type: FixedDelimiterTokenType }
    {
        for (let i = this.max_token_type_length; i > 0; i--)
        {
            let current_token_type = this.fixed_delimiter_token_types[i].get(code_segment.slice(0, i));
            if (current_token_type != undefined)
            {
                return { succeed: true, content: current_token_type.content, token_type: current_token_type };
            }
        }
        return { succeed: false };
    }
}

//A coordinate for chars in source code.
class TokenComplexCoordinate
{
    private index_value: number;
    private position_row_value: number;
    private position_column_value: number;

    private readonly code: string;

    public constructor(code: string)
    {
        this.index_value = 0;
        this.position_row_value = 0;
        this.position_column_value = 0;

        this.code = code;
    }

    public set index(value: number)
    {
        if (value < this.index)
        {
            throw new Error("Index can only increase.")
        }
        for (let i = this.index; i < value; i++)
        {
            if (this.code.charAt(i) == "\n" || (this.code.charAt(i) == "\r" && ((this.code.length <= i + 1) || this.code.charAt(i + 1) != "\n")))
            {
                this.position_column_value = 0;
                this.position_row_value = this.position_row_value + 1;
            } else
            {
                this.position_column_value = this.position_column_value + 1;
            }
        }
        this.index_value = value;
    }

    public get index(): number
    {
        return this.index_value;
    }

    public get position_row(): number
    {
        return this.position_row_value;
    }

    public get position_column(): number
    {
        return this.position_column_value;
    }
}