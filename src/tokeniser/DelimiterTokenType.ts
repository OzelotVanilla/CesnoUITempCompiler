import { Result } from "../util/Result";
import { Token } from "./Token";
import { TokenType } from "./TokenType";

/**
 * An instance of DelimiterTokenType defines a delimiter token.
 * A delimiter token is a token can DELIMIT the code. See TokenType for more details.
 */
export abstract class DelimiterTokenType extends TokenType
{

    protected constructor(name: string, auto_remove: boolean)
    {
        super(name, auto_remove);
    }

    /**
     * Return true and the content and other info of the token if the code or code sgement begins with a token of the current type.
     */
    public abstract matchAndGetContent(code_segment: string): Result<{content: string, raw_content_length: number}, void>;

}