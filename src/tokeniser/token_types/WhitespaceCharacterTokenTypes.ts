import { Result } from "../../util/Result";
import { DelimiterTokenType } from "../DelimiterTokenType";
import { FixedDelimiterTokenType } from "../FixedDelimiterTokenType";
import { TokenType } from "../TokenType";

class NewLineTokenType extends DelimiterTokenType
{
    public constructor()
    {
        super("new_line", true);
    }

    public matchAndGetContent(code_segment: string): Result<{content: string, raw_content_length: number}, void>
    {
        if (code_segment.slice(0, 2) == "\r\n")
        {
            return new Result(true, {content: "\r\n", raw_content_length: 2});
        }
        else if ((code_segment.charAt(0) == "\r") ||(code_segment.charAt(0) == "\n"))
        {
            return new Result(true, {content: code_segment.charAt(0), raw_content_length: 1});
        }
        return new Result(false, undefined);
    }
}

export let whitespace_token_types: TokenType[] =
[
    new FixedDelimiterTokenType("space", true, " "),
    new FixedDelimiterTokenType("tab", true, "\t"),
    new NewLineTokenType()
];