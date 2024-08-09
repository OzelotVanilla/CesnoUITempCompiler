import { HasTypeScriptRepresentation } from "../../generator/tsify"
import { AcceptableType } from "../../util/compiler_acceptable_types"
import { HasCesnoRepresentation } from "../../util/HasCesnoRepresentation"
import { Expression, Expression_Args } from "./Expression"
import { ValueExpression } from "./ValueExpression"

export class CesMLExpression extends Expression
{
    /**
     * The name of the component.
     * 
     * Example:
     * Name of `<a b="c"></a>` is `a`.
     */
    public readonly component: string

    public readonly props: Record<string, AcceptableType.BaseObject | Expression>

    public readonly children: Expression[] | null

    private getRepr(reprAccess: (e: HasCesnoRepresentation & HasTypeScriptRepresentation) => string)
    {
        const comp_name = this.component
        const inner = (this.children != null ? `\n  ${this.children.map(e => reprAccess(e)).join("\n  ")}\n` : "") as string
        const props = Object.entries(this.props).map(([k, v]) => `${k}={${reprAccess(v)}}`).join(" ")

        const result = `<${comp_name} ${props}>${inner}</${comp_name}>`

        return this.with_parenthesis ? `(${result})` : result
    }

    public get repr()
    {
        return this.getRepr(e => e.repr)
    }

    public get ts_repr()
    {
        return this.getRepr(e => e.ts_repr)
    }

    constructor({ component, props, children = null, with_parenthesis }: CesMLExpression_Args)
    {
        function wrap(value: CesMLExpression | string | AcceptableType.BaseObject)
        {
            if (typeof value == "string") { return new ValueExpression({ value: new AcceptableType.String({ value }) }) }
            else if (value instanceof AcceptableType.BaseObject) { return new ValueExpression({ value }) }
            else { return value }
        }

        super({ with_parenthesis })
        this.component = component
        this.props = props ?? {}
        this.children = children == null ? null :
            children instanceof Array ? children.map(wrap) : [wrap(children)]
    }
}

type CesMLExpression_Args = {
    component: string
    props?: Record<string, AcceptableType.BaseObject | Expression>
    children?: CesMLExpression | CesMLExpression[] | string | null
} & Expression_Args