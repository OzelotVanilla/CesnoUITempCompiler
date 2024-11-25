import { Result } from "../util/Result";
import { DelimiterTokenType } from "./DelimiterTokenType";

/**
 * A light weight and fast token type.
 * Token's content of the type can only be fixed such as "=", "+", "-", "*", "public", "class".
 */
export class FixedDelimiterTokenType extends DelimiterTokenType
{

    public readonly content: string;

    protected readonly content_length: number;

    /**
     * @param content The fixed content of the type.
     */
    public constructor(name: string, auto_remove: boolean, content: string)
    {
        super(name, auto_remove);
        this.content = content;
        this.content_length = content.length;
    }

    public matchAndGetContent(code_segment: string): Result<{content: string, raw_content_length: number}, void>
    {
        if (code_segment.slice(0, this.content_length) === this.content)
        {
            return new Result(true, {content: this.content, raw_content_length: this.content_length});
        } else
        {
            return new Result(false, undefined);
        }
    }
}