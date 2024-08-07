import { AcceptableType } from "../../util/compiler_acceptable_types";
import { Expression, Expression_Args } from "./Expression";

/**
 * The expression that contains a single value.
 * 
 * Example:
 * 
 * `"abc"` is a value expression containing a string value.
 */
export class ValueExpression extends Expression
{
    /** The value of the expression. */
    public readonly value: AcceptableType.BaseObject

    public get type() { return this.value.type }

    public get repr() { return this.with_parenthesis ? `(${this.value.repr})` : this.value.repr }

    constructor({ value, with_parenthesis }: ValueExpression_Args)
    {
        super({ with_parenthesis })
        this.value = value
    }
}

type ValueExpression_Args = {
    value: AcceptableType.BaseObject
} & Expression_Args