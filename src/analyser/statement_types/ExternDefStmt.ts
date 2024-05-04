import { AcceptableType, AcceptableTypeName, toAcceptableType } from "../../util/compiler_acceptable_types"
import { NameDefStmt, NameType } from "./NameDefStmt"

/**
 * Declaration of a name that is defined outside of current scope.
 * 
 * Example:
 * 
 * ```plaintext
 * component A
 * {
 *     extern function f() // Which is analysed into `ExternDefStmt`.
 * }
 * 
 * function f() { return 0 } // Which is the `def_by` of that `ExternDefStmt`.
 * ```
 */
export class ExternDefStmt extends NameDefStmt
{
    public readonly type: AcceptableType.Type
    public readonly def_by: ExternDefStmt_Args["def_by"]

    public override readonly stmt_type = NameType.extern

    constructor({ name, type, def_by = null }: ExternDefStmt_Args)
    {
        super({ name })
        this.type = toAcceptableType(type)
        this.def_by = def_by
    }
}

export type ExternDefStmt_Args = {
    name: string
    type: AcceptableType.Type | AcceptableTypeName
    def_by: NameDefStmt | null
}