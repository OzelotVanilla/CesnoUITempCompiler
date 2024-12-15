import { Token } from "../tokeniser/Token"


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