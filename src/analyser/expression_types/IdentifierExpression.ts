import { Expression, Expression_Args } from "./Expression";

/**
 * The expression that contains a single name such as variable/constant.
 * 
 * Example:
 * 
 * `a` is an identifier expression refer to a name `a`, which could be a variable.
 */
export class IdentifierExpression extends Expression
{
    /** The name of the identifier. */
    public readonly name: string

    public get repr() { return this.with_parenthesis ? `(${this.name})` : this.name }

    constructor({ name, with_parenthesis }: IdentifierExpression_Args)
    {
        super({ with_parenthesis })
        this.name = name
    }
}

type IdentifierExpression_Args = {
    name: string
} & Expression_Args