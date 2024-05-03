import { StmtNode } from "./statement_types/StmtNode"

export class AST
{
    private node
    private code
    public get stmt_nodes() { return [...this.node] }
    public get source_code() { return this.code }

    constructor({ stmt_nodes, source_code }: AST_Args)
    {
        this.node = stmt_nodes
        this.code = source_code
    }
}

type AST_Args = {
    stmt_nodes: StmtNode[]
    source_code: string
}