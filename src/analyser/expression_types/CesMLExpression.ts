import { AcceptableType } from "../../util/compiler_acceptable_types"
import { Expression, Expression_Args } from "./Expression"

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

    public readonly children: CesMLExpression[] | null

    public get repr()
    {
        const comp_name = this.component
        const inner = (this.children != null ? `\n  ${this.children.map(e => e.repr).join("\n  ")}\n` : "") as string
        const props = Object.entries(this.props).map(([k, v]) => `${k}={${v.repr}}`).join(" ")

        const result = `<${comp_name} ${props}>${inner}</${comp_name}>`

        return this.with_parenthesis ? `(${result})` : result
    }

    constructor({ component, props, children = null, with_parenthesis }: CesMLExpression_Args)
    {
        super({ with_parenthesis })
        this.component = component
        this.props = props ?? {}
        this.children = children == null ? null :
            children instanceof Array ? children : [children]
    }
}

type CesMLExpression_Args = {
    component: string
    props?: Record<string, AcceptableType.BaseObject | Expression>
    children?: CesMLExpression | CesMLExpression[] | null
} & Expression_Args