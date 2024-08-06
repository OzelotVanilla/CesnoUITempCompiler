import { TokenType } from "../tokeniser/TokenType"
import { Token } from "../tokeniser/Tokeniser"
import { parser } from "./lezer_parser/parser"
import { StateDefStmt } from "./statement_types/StateDefStmt"

export class Analyser
{
    private args: Analyser_Args

    constructor(args?: Analyser_Args)
    {
        this.args = args ?? {}
    }

    public parse(tokens: Token[]) //: Result<AST, TokeniseError>
    {

    }
}

export type Analyser_Args = {}

// function logError(message: string) {
//     console.log(message)
// }

// export function getNextToken(tokens: any) {
//     return tokens.shift()
// }

// function peekType(tokens: any) {
//     return tokens[0].type
// }

// function peekContent(tokens: any) {
//     return tokens[0].content
// }

// export function parseState(tokens: any) {
//     if (peekType(tokens) !== TokenType.identifier) {
//         logError("Expected 'identitier'")
//     }
//     const stateName = tokens.peekContent(tokens)

//     getNextToken(tokens)
//     if (peekType(tokens) !== TokenType.equal) {
//         logError("Expected '='")
//     }

//     getNextToken(tokens)
//     if (peekType(tokens) !== TokenType.numerical) {
//         logError("Expected numerical")
//     }
//     const stateValue = peekContent(tokens)
//     return new StateDefStmt({stateName: stateValue})
// }