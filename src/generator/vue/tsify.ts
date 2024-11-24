/**
 * This file is dedicate for the ts-ify process of Cesno code, under the syntax and context of Vue.
 */

import { CesMLExpression } from "../../analyser/expression_types/CesMLExpression"
import { Expression } from "../../analyser/expression_types/Expression"
import { IdentifierExpression, IdentifierType } from "../../analyser/expression_types/IdentifierExpression"
import
{
    BinaryExpression, different_in_ts_operator_convert_dict,
    OperandfulExpression, operator_repr_dict, TertiaryExpression, UnaryExpression
} from "../../analyser/expression_types/OperandfulExpression"
import { ValueExpression } from "../../analyser/expression_types/ValueExpression"
import { ComponentDefStmt } from "../../analyser/statement_types/ComponentDefStmt"
import { ConstDefStmt } from "../../analyser/statement_types/ConstDefStmt"
import { RenderStmt } from "../../analyser/statement_types/RenderStmt"
import { StateDefStmt } from "../../analyser/statement_types/StateDefStmt"
import { StmtNode } from "../../analyser/statement_types/StmtNode"
import { VarDefStmt } from "../../analyser/statement_types/VarDefStmt"
import { generateRenderReturn_Option } from "./render_stmt"

export type TsifyOption = {

} & generateRenderReturn_Option

export const default_tsify_option: Required<TsifyOption> = {
    props_name: "props",
    should_use_jsx: false
}

/**
 * This function is used to convert the expression to Vue-flavoured TypeScript representation.
 * 
 * Notice that the convert result **will be** fit for the *right-hand-side of the assigning expression*,
 * **not** for generating the `render` statement.
 */
export function tsifyExpression({ expr, options = default_tsify_option }: tsifyExpression_Params): string
{
    options = { ...default_tsify_option, ...options }

    if (expr instanceof CesMLExpression)
    {
        if (options.should_use_jsx) { return generateJSX({ expr, options }) }
        else { return generateH({ expr, options }) }
    }
    else
    {
        return tsifyNonMLExpression({ expr: expr as OperandfulExpression, options })
    }
}

export type tsifyExpression_Params = {
    expr: Expression
    options?: TsifyOption
}

/**
 * TODO: Not fully implemented.
 */
export function tsifyStatement({ stmt, options }: tsifyStatement_Params): string
{
    options = { ...default_tsify_option, ...options }

    if (stmt instanceof Expression)
    {
        return tsifyExpression({ expr: stmt, options })
    }
    else if (stmt instanceof ComponentDefStmt)
    {
        return `const ${stmt.name} = defineComponent(\n`
            + `(props ${stmt.has_children ? ", {slots}" : ""}) =>\n{\n`
            + stmt.def_body.map(s => tsifyStatement({ stmt: s, options })).join("\n")
            + `\n}\n)`
    }
    else if (stmt instanceof StateDefStmt)
    {
        return `let ${stmt.name} = ref(${tsifyExpression({ expr: stmt.init_expr! })})`
    }
    else if (stmt instanceof VarDefStmt)
    {
        return `let ${stmt.name}` + (stmt.init_expr != null ? `= ${tsifyExpression({ expr: stmt.init_expr })}` : ``)
    }
    else if (stmt instanceof ConstDefStmt)
    {
        return `const ${stmt.name} = ${stmt.init_expr}`
    }
    else if (stmt instanceof RenderStmt)
    {
        return `return () => ${generateH({
            expr: new CesMLExpression({ component: "div", children: stmt.ui_tree }), options
        })}`
    }
    else
    {
        throw TypeError(`Not implemented for "${stmt.constructor}"`)
    }
}

export type tsifyStatement_Params = {
    stmt: StmtNode
    options?: TsifyOption
}

/**
 * ## Usage
 * 
 * This function is used to convert the `render` statement into Vue code.
 * 
 * ### Case 1: CesMLExpression into `h`
 * 
 * This is the most common case that convert a UI-tree into the `h` call.
 * 
 * Example before:
 * ```tsx
 * <MyComp><MyDiv></MyDiv></MyComp>
 * ```
 * 
 * after:
 * ```ts
 * h("MyComp", [h("MyDiv")])
 * ```
 * 
 * ### Case 2: IdentifierExpression into `h`
 * 
 * This happens when the children of the `CesMLExpression` is not also a `CesMLExpression`.
 * 
 * Example before:
 * ```tsx
 * <MyComp>
 *     {some_prop} <br />
 *     {some_state}
 * </MyComp>
 * ```
 * 
 * after:
 * ```ts
 * h("MyComp", [
 *     h("span", props.some_prop),
 *     h("br"),
 *     h("span", some_state.value)
 * ])
 * ```
 * 
 * ### Case 3: OperandfulExpression into `h`
 * 
 * ### Case 4: String content into `h`
 * 
 * This works for the plaintext content in the children.
 * 
 * Example before:
 * ```tsx
 * <MyComp>
 *     abc
 *     "def"
 * </MyComp>
 * ```
 * 
 * after:
 * ```ts
 * h("MyComp", [
 *     h("span", "abc"),
 *     h("span", "def")
 * ])
 * ```
 * 
 * @see https://vuejs.org/guide/extras/render-function#basic-usage
 * 
 * @param expr The expression to be translated into a v-node generate function `h`.
 * @returns String of the `h` expression.
 */
export function generateH({ expr, options = default_tsify_option }: generateH_Params): string
{
    options = { ...default_tsify_option, ...options }

    // Case 1: CesMLExpression into `h`
    if (expr instanceof CesMLExpression)
    {
        const children__if_exist: string = expr.children != null
            ? `, [${expr.children.map(e => generateH({ expr: e, options })).join(", ")}]`
            : ``

        return `h("${expr.component}"${children__if_exist})`
    }
    // Case 2: IdentifierExpression into `h`
    else if (expr instanceof IdentifierExpression)
    {
        return `h("span", ${tsifyIdentifierExpression({ expr, options })})`
    }
    // Case 3: OperandfulExpression into `h`
    else if (expr instanceof OperandfulExpression)
    {
        return `h("span", ${tsifyOperandfulExpression({ expr, options })})`
    }
    // Case 4: String content into `h`
    else if (expr instanceof ValueExpression)
    {
        return `h("span", "${expr.ts_repr.replace(/^\"|\"$/g, "")}")`
    }
    else
    {
        throw TypeError(`Not implemented for "${expr.constructor}"`)
    }
}

export type generateH_Params = {
    expr: Expression
    options?: TsifyOption
}

export function generateJSX({ expr, options }: generateJSX_Params): string
{
    return ``
}

export type generateJSX_Params = {
    expr: Expression
    options?: TsifyOption
}

export function tsifyNonMLExpression({ expr, options = default_tsify_option }: tsifyNonMLExpression_Params): string
{
    options = { ...default_tsify_option, ...options }

    if (expr instanceof OperandfulExpression) { return tsifyOperandfulExpression({ expr, options }) }
    else if (expr instanceof IdentifierExpression) { return tsifyIdentifierExpression({ expr, options }) }
    else if (expr instanceof ValueExpression) { return expr.ts_repr }
    else { throw TypeError(`"tsifyNonMLExpression" does not implement "${(expr as object).constructor}".`) }
}

type tsifyNonMLExpression_Params = {
    expr: OperandfulExpression | IdentifierExpression | ValueExpression
    options?: TsifyOption
}

/**
 * This function is needed to handle the *props* and *state* in Vue.
 * 
 * Since 
 */
export function tsifyOperandfulExpression({ expr, options = default_tsify_option }: tsifyOperandfulExpression_Params): string
{
    options = { ...default_tsify_option, ...options }
    const { props_name } = options

    const operator_repr = operator_repr_dict.get(expr.operator)
    const convert_arr = different_in_ts_operator_convert_dict.get(expr.operator)

    if (expr instanceof UnaryExpression)
    {
        if (convert_arr == undefined) // Does not need to convert to TS operator.
        {
            const positioned_operators = operator_repr_dict.get(expr.operator)
            if (positioned_operators == undefined) { throw ReferenceError(`Unary operator "${expr.operator}" not recoreded in repr dict.`) }

            const additional_space = positioned_operators[0].match(/[a-z]+/) ? " " : ""

            const result = `${positioned_operators[0]}${additional_space}`
                + `${tsifyExpression({ expr: expr.operand, options })}${positioned_operators[1]}`

            return expr.with_parenthesis ? `(${result})` : result
        }
        else
        {
            return convert_arr.map(e => e == "$1" ? tsifyExpression({ expr: expr.operand }) : e).join(" ")
        }
    }
    else if (expr instanceof BinaryExpression)
    {
        if (convert_arr == undefined)
        {
            const repr_operator = operator_repr_dict.get(expr.operator)
            if (repr_operator == undefined) { throw ReferenceError(`Binary operator "${expr.operator}" not recoreded in repr dict.`) }

            const result = `${tsifyExpression({ expr: expr.operand_left, options })} ${repr_operator[0]}`
                + `${tsifyExpression({ expr: expr.operand_right, options })}`

            return expr.with_parenthesis ? `(${result})` : result
        }
        else
        {
            return convert_arr
                .map(e =>
                    e == "$1" ? tsifyExpression({ expr: expr.operand_left, options })
                        : e == "$2" ? tsifyExpression({ expr: expr.operand_right, options }) : e)
                .join(" ")
        }
    }
    else if (expr instanceof TertiaryExpression)
    {
        if (convert_arr == undefined)
        {
            const repr_operator = operator_repr_dict.get(expr.operator)
            if (repr_operator == undefined) { throw ReferenceError(`Binary operator "${expr.operator}" not recoreded in repr dict.`) }

            const result = `${tsifyExpression({ expr: expr.operand_left, options })} ${repr_operator[0]} `
                + `${tsifyExpression({ expr: expr.operand_middle, options })} ${repr_operator[1]} `
                + `${tsifyExpression({ expr: expr.operand_right, options })}`

            return expr.with_parenthesis ? `(${result})` : result
        }
        else
        {
            throw TypeError(`Not implemented for ${expr.operator}.`)
        }
    }
    else
    {
        throw TypeError(`Unknown operandful expression type "${expr.constructor}".`)
    }
}

type tsifyOperandfulExpression_Params = {
    expr: OperandfulExpression
    options?: TsifyOption
}

export function tsifyIdentifierExpression({ expr, options = default_tsify_option }: tsifyIdentifierExpression_Params): string
{
    options = { ...default_tsify_option, ...options }
    const { props_name } = options

    switch (expr.type)
    {
        case IdentifierType.namespace:
        case IdentifierType.class:
        case IdentifierType.function:
        case IdentifierType.variable:
        case IdentifierType.constant:
        case IdentifierType.argument:
        case IdentifierType.member:
        case IdentifierType.component:
            return expr.ts_repr

        case IdentifierType.state:
            return `${expr.name}.value`
        case IdentifierType.property:
            return `${props_name}.${expr.name}`
        case IdentifierType.child:
            return `slots.default()`

        default: throw TypeError(`tsifyIdentifierExpression does not implement "${expr.type}" for IdentifierType.`)
    }
}

type tsifyIdentifierExpression_Params = {
    expr: IdentifierExpression
    options?: TsifyOption
}