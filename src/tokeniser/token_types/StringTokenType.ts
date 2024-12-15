import { Result } from "../../util/Result";
import { DelimiterTokenType } from "../DelimiterTokenType";

/**
 * For only "common" strings. Tempelate strings are not supported in this temp compiler.
 */
export class StringTokenType extends DelimiterTokenType
{

    public constructor()
    {
        super("string", false);
    }

    public matchAndGetContent(code_segment: string): Result<{content: string, raw_content_length: number}, void>
    {
        if (code_segment.at(0) != "\"")
        {
            return new Result(false, undefined);
        }
        for (let i = 1, content = "\""; i < code_segment.length; i++)
        {
            let current_char = code_segment.at(i);
            if (current_char == "\\")
            {
                content = content + parseEscapeSequences(<string>(code_segment.at(i + 1)));

                i++;
                continue;
            }
            if (current_char == "\"")
            {
                return new Result(true, {content: content, raw_content_length: i});
            }
            content = content + current_char;
        }
        return new Result(false, undefined);
    }
}

function parseEscapeSequences(escape_char: string): string
{
    switch (escape_char)
    {
        case "b":
            return "\b";

        case "f":
            return "\f";

        case "n":
            return "\n";

        case "r":
            return "\r";

        case "t":
            return "\t";

        case "v":
            return "\v";

        case "\\":
            return "\\";

        case "\'":
            return "\'";

        case "\"":
            return "\"";

        default:
            throw new Error("Escape Sequence must be valid.");
    }
}