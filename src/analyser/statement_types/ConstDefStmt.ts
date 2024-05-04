import { AcceptableType, AcceptableTypeName, toAcceptableType } from "../../util/compiler_acceptable_types"
import { Expression } from "../expression_types/Expression"
import { NameDefStmt, NameDefStmt_Args, NameType } from "./NameDefStmt"

/**
 * Definition of a constant.
 */
export class ConstDefStmt extends NameDefStmt
{
    public readonly type: AcceptableType.Type
    public readonly init_expr: Expression | null

    public override readonly stmt_type = NameType.constant

    constructor({ name, type, init_expr = null }: StateDefStmt_Args)
    {
        super({ name })
        this.type = toAcceptableType(type)
        this.init_expr = init_expr
    }
}

export type StateDefStmt_Args = NameDefStmt_Args & {
    type: AcceptableType.Type | AcceptableTypeName
    init_expr?: Expression | null
}