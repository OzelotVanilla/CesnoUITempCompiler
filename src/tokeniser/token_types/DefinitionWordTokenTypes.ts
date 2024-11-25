import { RemainderTokenType } from "../RemainderTokenType";
import { TokenType } from "../TokenType";

export let definition_word_token_types: TokenType[] =
[
    new RemainderTokenType("class_definition", false, /^class$/),
    new RemainderTokenType("method_of_class_definition", false, /^method$/),
    new RemainderTokenType("function_definition", false, /^function$/),
    new RemainderTokenType("dynamic_type_variable_definition", false, /^let$/),
    new RemainderTokenType("cesnoUI_component_definition", false, /^component$/),
    new RemainderTokenType("cesnoUI_state_definition", false, /^state$/)
];