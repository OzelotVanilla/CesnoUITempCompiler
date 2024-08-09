import { Expression, Expression_Args } from "./Expression";

export enum IdentifierType
{
    namespace = "namespace",
    class = "class",
    function = "function",
    variable = "variable",
    constant = "constant",
    state = "state",
    /** Related to component's property. */
    property = "property",
    /** The argument inside function body, defined by function parameter's list. */
    argument = "argument",
    /** The member of a class/object. Such as `b` in `a.b`. */
    member = "member",
    /** The method of a class/object. Such as `m` in `a.m()`. */
    component = "component",
}

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
    /** The type of the identifier. */
    public readonly type: IdentifierType

    public get repr() { return this.with_parenthesis ? `(${this.name})` : this.name }

    public get ts_repr() { return this.repr }

    constructor({ name, type, with_parenthesis }: IdentifierExpression_Args)
    {
        super({ with_parenthesis })
        this.name = name
        this.type = type
    }
}

type IdentifierExpression_Args = {
    name: string
    type: IdentifierType
} & Expression_Args