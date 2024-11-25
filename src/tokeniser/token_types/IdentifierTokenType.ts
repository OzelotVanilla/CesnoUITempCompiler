import { RemainderTokenType } from "../RemainderTokenType";
import { TokenType } from "../TokenType";

export let identifier_token_types: TokenType[] =
[
    new RemainderTokenType("identifier", true, /.+/, -1)
];