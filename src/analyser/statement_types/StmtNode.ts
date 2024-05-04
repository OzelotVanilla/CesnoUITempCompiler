export abstract class StmtNode
{
    private static stmt_id_counter: number

    public readonly stmt_id

    constructor({ }: StmtNode_Args)
    {
        this.stmt_id = StmtNode.stmt_id_counter++
    }
}

export type StmtNode_Args = {

}