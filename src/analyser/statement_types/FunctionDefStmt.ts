import { AcceptableType, AcceptableTypeName, normaliseAcceptableTypeName, toAcceptableType } from "../../util/compiler_acceptable_types"
import { NameDefStmt, NameDefStmt_Args, NameType } from "./NameDefStmt"
import { StmtNode } from "./StmtNode"

/**
 * Definition of a function.
 */
export class FunctionDefStmt extends NameDefStmt
{
    public readonly args: Record<string, AcceptableType.Type> | null
    public readonly returns: AcceptableType.Type
    public readonly def_body: FunctionDefStmt_Args["def_body"]

    public override readonly stmt_type = NameType.function

    constructor({ name, args, returns, def_body }: FunctionDefStmt_Args)
    {
        super({ name })
        this.args = (args != undefined && args != null) ? normaliseAcceptableTypeName(args) : null
        this.returns = toAcceptableType(returns)
        this.def_body = def_body
    }
}

export type FunctionDefStmt_Args = NameDefStmt_Args & {
    args?: Record<string, AcceptableType.Type | AcceptableTypeName>
    returns: AcceptableType.Type | AcceptableTypeName
    def_body: StmtNode[]
}