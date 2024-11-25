import { DelimiterTokenType } from "../DelimiterTokenType";
import { FixedDelimiterTokenType } from "../FixedDelimiterTokenType";
import { TokenType } from "../TokenType";

class NewLineTokenType extends DelimiterTokenType
{
    public constructor()
    {
        super("new_line", false);
    }

    public matchAndGetContent(code_segment: string): { succeed: false } | { succeed: true, content: string, raw_content_length: number }
    {
        if (code_segment.slice(0, 2) == "\r\n")
        {
            return { succeed: true, content: "\r\n", raw_content_length: 2};
        }
        else if ((code_segment.charAt(0) == "\r") ||(code_segment.charAt(0) == "\n"))
        {
            return { succeed: true, content: code_segment.charAt(0), raw_content_length: 1};
        }
        return { succeed: false };
    }
}

export let whitespace_token_types: TokenType[] =
[
    new FixedDelimiterTokenType("space", true, " "),
    new FixedDelimiterTokenType("tab", true, "\t"),
    new NewLineTokenType()
];