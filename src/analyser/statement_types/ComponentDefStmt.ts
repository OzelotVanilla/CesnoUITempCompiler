import { AcceptableType } from "../../util/compiler_acceptable_types"
import { NameDefStmt, NameDefStmt_Args } from "./NameDefStmt"
import { StmtNode } from "./StmtNode"

export class ComponentDefStmt extends NameDefStmt
{
    public readonly props: ComponentDefStmt_Args["props"]
    public readonly children: ComponentDefStmt_Args["children"]
    public readonly def_body: ComponentDefStmt_Args["def_body"]

    constructor({ name, props, children, def_body }: ComponentDefStmt_Args)
    {
        super({ name })
        this.props = props
        this.children = children
        this.def_body = def_body
    }
}

export type ComponentDefStmt_Args = NameDefStmt_Args & {
    props?: Record<string, AcceptableType.Object>
    children?: AcceptableType.Component | AcceptableType.String
    def_body: StmtNode[]
}