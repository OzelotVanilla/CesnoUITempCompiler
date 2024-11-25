import { FixedDelimiterTokenType } from "../FixedDelimiterTokenType";
import { TokenType } from "../TokenType";

export let operator_token_types: TokenType[] =
[
    new FixedDelimiterTokenType("addition", false, "+"),
    new FixedDelimiterTokenType("subtraction", false, "-"),
    new FixedDelimiterTokenType("multiplication", false, "*"),
    new FixedDelimiterTokenType("division", false, "/"),
    new FixedDelimiterTokenType("assignment", false, "="),
    new FixedDelimiterTokenType("equality_test", false, "==")
];