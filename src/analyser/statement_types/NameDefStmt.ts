import { StmtNode } from "./StmtNode"

/**
 * Used to record the definition of an identifier (name).
 */
export abstract class NameDefStmt extends StmtNode
{
    public readonly name
    public readonly stmt_type: NameType = NameType.error_type__name_def_stmt

    constructor({ name }: NameDefStmt_Args)
    {
        super({})
        this.name = name
    }
}

export type NameDefStmt_Args = {
    name: string
}

export enum NameType
{
    namespace = "namespace",
    class = "class",
    function = "function",
    variable = "variable",
    constant = "constant",
    state = "state",
    component = "component",
    extern = "extern",
    error_type__name_def_stmt = "name_def_stmt__need_to_be_overrided"
}