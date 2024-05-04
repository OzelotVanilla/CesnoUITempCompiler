import { AcceptableType } from "../../util/compiler_acceptable_types"
import { NameDefStmt } from "./NameDefStmt"
import { StmtNode } from "./StmtNode"

export class ExternDefStmt extends StmtNode
{
    public readonly name: ExternDefStmt_Args["name"]
    public readonly type: ExternDefStmt_Args["type"]
    public readonly def_by: ExternDefStmt_Args["def_by"]

    constructor({ name, type, def_by }: ExternDefStmt_Args)
    {
        super({})
        this.name = name
        this.type = type
        this.def_by = def_by
    }
}

export type ExternDefStmt_Args = {
    name: string
    type: AcceptableType.Object
    def_by: NameDefStmt | null
}