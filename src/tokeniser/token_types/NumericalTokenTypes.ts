import { RemainderTokenType } from "../RemainderTokenType";
import { TokenType } from "../TokenType";

export let numerical_token_types: TokenType[] =
[
    new RemainderTokenType("decimal_integer_number", false, /^[\d]+$/),
    new RemainderTokenType("binary_integer_number", false, /^[01]+$/),
    new RemainderTokenType("hexadecimal_integer_number", false, /^[\dabcdef]+$/),
    new RemainderTokenType("decimal_number", false, /^[\d]+[.][\d]+$/),
    new RemainderTokenType("index_form_number", false, /^[\d]+([.][\d]+)?[Ee][\d]+$/)
];