import { AcceptableType, AcceptableTypeName, normaliseAcceptableTypeName } from "../../util/compiler_acceptable_types"
import { NameDefStmt, NameDefStmt_Args, NameType } from "./NameDefStmt"
import { StmtNode } from "./StmtNode"

/**
 * Definition of a component.
 */
export class ComponentDefStmt extends NameDefStmt
{
    public readonly props: Record<string, AcceptableType.Type> | null
    public readonly has_children: ComponentDefStmt_Args["has_children"]
    public readonly def_body: ComponentDefStmt_Args["def_body"]

    public override readonly stmt_type = NameType.component

    constructor({ name, props, has_children = false, def_body }: ComponentDefStmt_Args)
    {
        super({ name })
        this.props = (props != undefined && props != null) ? normaliseAcceptableTypeName(props) : null
        this.has_children = has_children
        this.def_body = def_body
    }
}

export type ComponentDefStmt_Args = NameDefStmt_Args & {
    props?: Record<string, AcceptableType.Type | AcceptableTypeName> | null
    has_children?: boolean
    def_body: StmtNode[]
}