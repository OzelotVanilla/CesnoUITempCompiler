import { HasCesnoRepresentation } from "../../util/HasCesnoRepresentation";
import { StmtNode } from "../statement_types/StmtNode";

export abstract class Expression extends StmtNode implements HasCesnoRepresentation
{
    public abstract get repr(): string

    public readonly with_parenthesis: boolean

    constructor({ with_parenthesis = false }: Expression_Args)
    {
        super({})
        this.with_parenthesis = with_parenthesis
    }
}

export type Expression_Args = {
    with_parenthesis?: boolean
}