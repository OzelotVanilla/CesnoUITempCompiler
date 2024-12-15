import { Tokeniser } from "../../src/tokeniser/Tokeniser";
import { definition_word_token_types } from "../../src/tokeniser/token_types/DefinitionWordTokenTypes";
import { identifier_token_types } from "../../src/tokeniser/token_types/IdentifierTokenType";
import { numerical_token_types } from "../../src/tokeniser/token_types/NumericalTokenTypes";
import { operator_token_types } from "../../src/tokeniser/token_types/OperatorTokenTypes";
import { StringTokenType } from "../../src/tokeniser/token_types/StringTokenType";
import { structure_token_types } from "../../src/tokeniser/token_types/StructureTokenTypes";
import { whitespace_token_types } from "../../src/tokeniser/token_types/WhitespaceCharacterTokenTypes";

function getADefauitTokeniser()
{
    let tokeniser = new Tokeniser();
    definition_word_token_types.forEach((x) => tokeniser.addTokenType(x));
    identifier_token_types.forEach((x) => tokeniser.addTokenType(x));
    numerical_token_types.forEach((x) => tokeniser.addTokenType(x));
    operator_token_types.forEach((x) => tokeniser.addTokenType(x));
    
    tokeniser.addTokenType(new StringTokenType());
    structure_token_types.forEach((x) => tokeniser.addTokenType(x));
    whitespace_token_types.forEach((x) => tokeniser.addTokenType(x));

    return tokeniser;
}

let tokeniser = getADefauitTokeniser();

let test_codes =
[
    `component Box(child)
{
    state state_name = 0
    let temp_var_name = state_name + 1
    
    render (<div>{temp_var_name}</div>)
}

component App()
{

    // This defines the result of rendering
    render (<Box>{temp_var_name}</Box>)
}`,
"P = U * I;",
"component;"
];

let test_tokens =
[
    [
        
    ]
];

test(
    "Test Tokeniser",
    function ()
    {
        let result = tokeniser.parse(test_codes[0]);
        console.log(String(result.unwrapOk().tokens));
        expect(result == result).toBe(true);
    }
);