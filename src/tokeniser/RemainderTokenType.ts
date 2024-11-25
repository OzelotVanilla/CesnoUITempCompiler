import { Result } from "../util/Result";
import { TokenType } from "./TokenType";

/**
 * An instance of RemainderTokenType defines a remainder token.
 * Remainder tokens are the remaining segments after matching and separate all delimiter tokens from the code. See TokenType for more details.
 */
export class RemainderTokenType extends TokenType
{

    public readonly matcher_reg_ex: RegExp;

    /**
     * The order the RemainderTokenType tries to match code segments.
     * The greater of the priority, the first the RemainderTokenType tries to match.
     * By default, 0.
     */
    public readonly priority: number;

    public constructor(name: string, auto_remove: boolean, matcher_reg_ex: RegExp, priority: number = 0)
    {
        super(name, auto_remove);
        this.matcher_reg_ex = matcher_reg_ex;
        this.priority = priority
    }

    public match(code_segment: string): Result<string, void>
    {
        if (this.matcher_reg_ex.test(code_segment))
        {
            return new Result(true, code_segment);
        } else 
        {
            return new Result(false, undefined);
        }
    }
}