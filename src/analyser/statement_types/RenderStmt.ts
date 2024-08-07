import { CesMLExpression } from "../expression_types/CesMLExpression";
import { StmtNode } from "./StmtNode";

/**
 * Definition of the content for a component to render.
 */
export class RenderStmt extends StmtNode
{
    public readonly ui_tree: CesMLExpression[]

    constructor({ ui_tree }: RenderStmt_Args)
    {
        super({})
        this.ui_tree = ui_tree instanceof Array ? ui_tree : [ui_tree]
    }
}

type RenderStmt_Args = {
    ui_tree: CesMLExpression | CesMLExpression[]
}