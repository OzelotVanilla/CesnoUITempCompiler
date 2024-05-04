import { AcceptableType } from "../../util/compiler_acceptable_types"
import { NameDefStmt, NameDefStmt_Args } from "./NameDefStmt"
import { StmtNode } from "./StmtNode"

export class FunctionDefStmt extends NameDefStmt
{
    public readonly args: FunctionDefStmt_Args["args"]
    public readonly returns: FunctionDefStmt_Args["returns"]
    public readonly def_body: FunctionDefStmt_Args["def_body"]

    constructor({ name, args, returns, def_body }: FunctionDefStmt_Args)
    {
        super({ name })
        this.args = args
        this.returns = returns
        this.def_body = def_body
    }
}

export type FunctionDefStmt_Args = NameDefStmt_Args & {
    args: Record<string, AcceptableType.Object>
    returns: AcceptableType.Object
    def_body: StmtNode[]
}