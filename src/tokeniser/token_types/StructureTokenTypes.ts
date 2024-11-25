import { FixedDelimiterTokenType } from "../FixedDelimiterTokenType";
import { TokenType } from "../TokenType";

export let structure_token_types: TokenType[] =
[
    new FixedDelimiterTokenType("left_ang_bracket", false, "<"),
    new FixedDelimiterTokenType("right_ang_bracket", false, ">"),
    new FixedDelimiterTokenType("left_paren", false, "("),
    new FixedDelimiterTokenType("right_paren", false, ")"),
    new FixedDelimiterTokenType("left_bracket", false, "["),
    new FixedDelimiterTokenType("right_bracket", false, "]"),
    new FixedDelimiterTokenType("left_brace", false, "{"),
    new FixedDelimiterTokenType("right_brace", false, "}"),
    new FixedDelimiterTokenType("dot", false, "."),
    new FixedDelimiterTokenType("colon", false, ":"),
    new FixedDelimiterTokenType("semicolon", false, ";")
];