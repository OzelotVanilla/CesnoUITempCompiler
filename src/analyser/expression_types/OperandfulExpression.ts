import { CesMLExpression } from "./CesMLExpression";
import { Expression, Expression_Args } from "./Expression";

export type Operator = UnaryOperator | BinaryOperator | TertiaryOperator | PostfixOperator

export abstract class OperandfulExpression extends Expression
{
    public abstract get repr(): string
    public abstract readonly operator: Operator
}

export class UnaryExpression extends OperandfulExpression
{
    public readonly operator: UnaryOperator
    public readonly operand: Expression

    public get repr()
    {
        const positioned_operators = operator_repr_dict.get(this.operator)
        if (positioned_operators == undefined) { throw ReferenceError(`Unary operator "${this.operator}" not recoreded in repr dict.`) }

        const additional_space = positioned_operators[0].match(/[a-z]+/) ? " " : ""

        const result = `${positioned_operators[0]}${additional_space}${this.operand.repr}${positioned_operators[1]}`

        return this.with_parenthesis ? `(${result})` : result
    }

    constructor({ operator, operand, with_parenthesis }: UnaryExpression_Args)
    {
        super({ with_parenthesis })
        this.operator = operator
        this.operand = operand
    }
}

export type UnaryExpression_Args = {
    operator: UnaryOperator,
    operand: Expression
} & Expression_Args

export class BinaryExpression extends OperandfulExpression
{
    public readonly operator: BinaryOperator
    public readonly operand_left: Expression
    public readonly operand_right: Expression

    public get repr()
    {
        const repr_operator = operator_repr_dict.get(this.operator)
        if (repr_operator == undefined) { throw ReferenceError(`Binary operator "${this.operator}" not recoreded in repr dict.`) }

        const result = `${this.operand_left.repr} ${repr_operator[0]} ${this.operand_right.repr}`

        return this.with_parenthesis ? `(${result})` : result
    }

    constructor({ operator, operand_left, operand_right, with_parenthesis }: BinaryExpression_Args)
    {
        super({ with_parenthesis })
        this.operator = operator
        this.operand_left = operand_left
        this.operand_right = operand_right
    }
}

export type BinaryExpression_Args = {
    operator: BinaryOperator,
    operand_left: Expression
    operand_right: Expression
} & Expression_Args

export class TertiaryExpression extends OperandfulExpression
{
    public readonly operator: TertiaryOperator
    public readonly operand_left: Expression
    public readonly operand_middle: Expression
    public readonly operand_right: Expression

    public get repr()
    {
        const repr_operator = operator_repr_dict.get(this.operator)
        if (repr_operator == undefined) { throw ReferenceError(`Binary operator "${this.operator}" not recoreded in repr dict.`) }

        const result = `${this.operand_left.repr} ${repr_operator[0]} ${this.operand_middle.repr}`
            + `${repr_operator[1]} ${this.operand_right.repr}`

        return this.with_parenthesis ? `(${result})` : result
    }

    constructor({ operator, operand_left, operand_middle, operand_right, with_parenthesis }: TertiaryExpression_Args)
    {
        super({ with_parenthesis })
        this.operator = operator
        this.operand_left = operand_left
        this.operand_middle = operand_middle
        this.operand_right = operand_right
    }
}

export type TertiaryExpression_Args = {
    operator: TertiaryOperator,
    operand_left: Expression
    operand_middle: Expression
    operand_right: Expression
} & Expression_Args

export class MemberAccessExpression extends OperandfulExpression
{
    public readonly operator: PostfixOperator.member_access
    /** The object to be accessed from, the `a` in the `a.b`. */
    public readonly operand: Expression
    /** The member to access, the `b` in the `a.b`. */
    public readonly member: string

    public get repr()
    {
        return `${this.operand.repr}${operator_repr_dict.get(this.operator) ?? "."}${this.member}`
    }

    constructor({ operand, member, with_parenthesis, operator = PostfixOperator.member_access }: MemberAccessExpression_Args)
    {
        super({ with_parenthesis })
        this.operand = operand
        this.member = member
        this.operator = operator
    }
}

export type MemberAccessExpression_Args = {
    operator?: PostfixOperator.member_access
    /** The object to be accessed from, the `a` in the `a.b`. */
    operand: Expression
    /** The member to access, the `b` in the `a.b`. */
    member: string
} & Expression_Args

export class CallExpression extends OperandfulExpression
{
    public readonly operator: PostfixOperator.call
    /** The function to be call. Like `a` in `a(b, c + 1)`. */
    public readonly operand: Expression
    /** The parameter of the function. Like `b` and `c + 1` in `a(b, c + 1)`. */
    public readonly params: Expression[]

    public get repr()
    {
        const operators = operator_repr_dict.get(this.operator) ?? ["(", ")"]
        return `${this.operand.repr}${operators[0]}${this.params.join(", ")}${operators[1]}`
    }

    constructor({ operand, params, with_parenthesis, operator = PostfixOperator.call }: CallExpression_Args)
    {
        super({ with_parenthesis })
        this.operand = operand
        this.params = params
        this.operator = operator
    }
}

export type CallExpression_Args = {
    operator?: PostfixOperator.call
    /** The function to be call. Like `a` in `a(b, c + 1)`. */
    operand: Expression
    /** The parameter of the function. Like `b` and `c + 1` in `a(b, c + 1)`. */
    params: Expression[]
} & Expression_Args

export class SubscriptExpression extends OperandfulExpression
{
    public readonly operator: PostfixOperator.subscript
    /** The expression to be subscript. Like `a` in `a[b + 1]`. */
    public readonly operand: Expression
    /** The parameter of the subsript. Like `b + 1` in `a[b + 1]. */
    public readonly params: Expression

    public get repr()
    {
        const operators = operator_repr_dict.get(this.operator) ?? ["[", "]"]
        return `${this.operand.repr}${operators[0]}${this.params}${operators[1]}`
    }

    constructor({ operand, params, with_parenthesis, operator = PostfixOperator.subscript }: SubscriptExpression_Args)
    {
        super({ with_parenthesis })
        this.operand = operand
        this.params = params
        this.operator = operator
    }
}

export type SubscriptExpression_Args = {
    operator?: PostfixOperator.subscript
    /** The expression to be subscript. Like `a` in `a[b + 1]`. */
    operand: Expression
    /** The parameter of the subsript. Like `b + 1` in `a[b + 1]. */
    params: Expression
} & Expression_Args

export enum UnaryOperator
{
    /** `+a`. */
    numerise = "numerise",
    /** `-a`. */
    negate = "negate",
    /** `not a`. */
    logic_not = "logic_not",
    /** `++a`. */
    prefix_inc = "prefix_inc",
    /** `--a`. */
    prefix_dec = "prefix_dec",
    /** `a++`. */
    suffix_inc = "suffix_inc",
    /** `a--`. */
    suffix_dec = "suffix_dec",
}

export enum BinaryOperator
{
    /** `a + b`. */
    plus = "plus",
    /** `a - b`. */
    minus = "minus",
    /** `a * b`. */
    multiply = "multiply",
    /** `a / b`. */
    divide = "divide",
    /** `a mod b`. */
    mod = "mod",
    /** `a and b`. */
    logic_and = "logic_and",
    /** `a or b`. */
    logic_or = "logic_or",
    /** `a xor b`. */
    logic_xor = "logic_or",
    /** `a bitand b`. */
    bitwise_and = "bitwise_and",
    /** `a bitor b`. */
    bitwise_or = "bitwise_or",
    /** `a bitxor b`. */
    bitwise_xor = "bitwise_xor",
    /** `a bitlsh b`. */
    bitwise_left_shift = "bitwise_left_shift",
    /** `a bitrsh b`. */
    bitwise_right_shift = "bitwise_right_shift",
    /** `a bitulsh b`. */
    bitwise_unsigned_left_shift = "bitwise_unsigned_left_shift",
    /** `a bitursh b`. */
    bitwise_unsigned_right_shift = "bitwise_unsigned_right_shift",
    /** `a == b`. */
    equal = "equal",
    /** `a === b`. */
    absolute_equal = "absolute_equal",
    /** `a != b`. */
    not_equal = "not_equal",
    /** `a < b`. */
    less_than = "less_than",
    /** `a <= b`. */
    less_equal = "less_equal",
    /** `a > b`. */
    greater_than = "greater_than",
    /** `a >= b`. */
    greater_equal = "greater_equal",
    /** `a = b`. */
    assign = "assign",
    /** `a += b`. */
    assign_after_plus = "assign_after_plus",
    /** `a -= b`. */
    assign_after_minus = "assign_after_minus",
    /** `a *= b`. */
    assign_after_multiply = "assign_after_multiply",
    /** `a /= b`. */
    assign_after_divide = "assign_after_divide",
    /** `a mod= b`. */
    assign_after_mod = "assign_after_mod",
    /** `a bitand= b`. */
    assign_after_bitwise_and = "assign_after_bitwise_and",
    /** `a bitor= b`. */
    assign_after_bitwise_or = "assign_after_bitwise_or",
    /** `a bitxor= b`. */
    assign_after_bitwise_xor = "assign_after_bitwise_xor",
    /** `a bitlsh= b`. */
    assign_after_bitwise_left_shift = "assign_after_bitwise_left_shift",
    /** `a bitrsh= b`. */
    assign_after_bitwise_right_shift = "assign_after_bitwise_right_shift",
    /** `a bitulsh= b`. */
    assign_after_bitwise_unsigned_left_shift = "assign_after_bitwise_unsigned_left_shift",
    /** `a bitursh= b`. */
    assign_after_bitwise_unsigned_right_shift = "assign_after_bitwise_unsigned_right_shift"
}

export enum TertiaryOperator
{
    /** `a ? b : c`. */
    if_then_else = "if_then_else"
}

export enum PostfixOperator
{
    /** `a.b`. */
    member_access = "member_access",
    /** `a()`, `a(b)`, or `a(b, c)` etc. */
    call = "call",
    /** `a[b]`. */
    subscript = "subscript"
}

/**
 * For unary operator, to correctly show the prefix-suffix difference, the array is used like:
 * ```
 * "prefix_inc", ["++", ""] // ++a
 * "suffix_inc", ["", "++"] // a++
 * ```
 */
const operator_repr_dict: Map<Operator | string, string[]> = new Map([
    ["numerise", ["+", ""]], ["negate", ["-", ""]], ["logic_not", ["not", ""]],
    ["prefix_inc", ["++", ""]], ["prefix_dec", ["--", ""]], ["suffix_inc", ["", "++"]], ["suffix_dec", ["", "--"]],

    ["plus", ["+"]], ["minus", ["-"]], ["multiply", ["*"]], ["divide", ["/"]], ["mod", ["mod"]],
    ["logic_and", ["and"]], ["logic_or", ["or"]], ["logic_xor", ["xor"]],
    ["bitwise_and", ["bitand"]], ["bitwise_or", ["bitor"]], ["bitwise_xor", ["bitxor"]],
    ["bitwise_left_shift", ["bitlsh"]], ["bitwise_right_shift", ["bitrsh"]],
    ["bitwise_unsigned_left_shift", ["bitulsh"]], ["bitwise_unsigned_right_shift", ["bitursh"]],
    ["equal", ["=="]], ["absolute_equal", ["==="]], ["not_equal", ["!="]],
    ["less_than", ["<"]], ["less_equal", ["<="]], ["greater_than", [">"]], ["greater_equal", [">="]],
    ["assign", ["="]],
    ["assign_after_plus", ["+="]], ["assign_after_minus", ["-="]],
    ["assign_after_multiply", ["*="]], ["assign_after_divide", ["/="]], ["assign_after_mod", ["mod="]],
    ["assign_after_bitwise_and", ["bitand="]], ["assign_after_bitwise_or", ["bitor="]], ["assign_after_bitwise_xor", ["bitxor="]],
    ["assign_after_bitwise_left_shift", ["bitlsh="]], ["assign_after_bitwise_right_shift", ["bitrsh="]],
    ["assign_after_bitwise_unsigned_left_shift", ["bitulsh="]], ["assign_after_bitwise_unsigned_right_shift", ["bitursh="]],

    ["if_then_else", ["?", ":"]],

    ["member_access", ["."]], ["call", ["(", ")"]], ["subscript", ["[", "]"]],

    [UnaryOperator.numerise, ["+", ""]], [UnaryOperator.negate, ["-", ""]], [UnaryOperator.logic_not, ["not", ""]],
    [UnaryOperator.prefix_inc, ["++", ""]], [UnaryOperator.prefix_dec, ["--", ""]],
    [UnaryOperator.suffix_inc, ["", "++"]], [UnaryOperator.suffix_dec, ["", "--"]],

    [BinaryOperator.plus, ["+"]], [BinaryOperator.minus, ["-"]], [BinaryOperator.multiply, ["*"]], [BinaryOperator.divide, ["/"]],
    [BinaryOperator.mod, ["mod"]],
    [BinaryOperator.logic_and, ["and"]], [BinaryOperator.logic_or, ["or"]], [BinaryOperator.logic_xor, ["xor"]],
    [BinaryOperator.bitwise_and, ["bitand"]], [BinaryOperator.bitwise_or, ["bitor"]], [BinaryOperator.bitwise_xor, ["bitxor"]],
    [BinaryOperator.bitwise_left_shift, ["bitlsh"]], [BinaryOperator.bitwise_right_shift, ["bitrsh"]],
    [BinaryOperator.bitwise_unsigned_left_shift, ["bitulsh"]], [BinaryOperator.bitwise_unsigned_right_shift, ["bitursh"]],
    [BinaryOperator.equal, ["=="]], [BinaryOperator.absolute_equal, ["==="]], [BinaryOperator.not_equal, ["!="]],
    [BinaryOperator.less_than, ["<"]], [BinaryOperator.less_equal, ["<="]],
    [BinaryOperator.greater_than, [">"]], [BinaryOperator.greater_equal, [">="]],
    [BinaryOperator.assign, ["="]],
    [BinaryOperator.assign_after_plus, ["+="]], [BinaryOperator.assign_after_minus, ["-="]],
    [BinaryOperator.assign_after_multiply, ["*="]], [BinaryOperator.assign_after_divide, ["/="]],
    [BinaryOperator.assign_after_mod, ["mod="]],
    [BinaryOperator.assign_after_bitwise_and, ["bitand="]], [BinaryOperator.assign_after_bitwise_or, ["bitor="]],
    [BinaryOperator.assign_after_bitwise_xor, ["bitxor="]],
    [BinaryOperator.assign_after_bitwise_left_shift, ["bitlsh="]],
    [BinaryOperator.assign_after_bitwise_right_shift, ["bitrsh="]],
    [BinaryOperator.assign_after_bitwise_unsigned_left_shift, ["bitulsh="]],
    [BinaryOperator.assign_after_bitwise_unsigned_right_shift, ["bitursh="]],

    [TertiaryOperator.if_then_else, ["?", ":"]],

    [PostfixOperator.member_access, ["."]], [PostfixOperator.call, ["(", ")"]], [PostfixOperator.subscript, ["[", "]"]]
])