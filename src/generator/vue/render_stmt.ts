import { RenderStmt } from "../../analyser/statement_types/RenderStmt";
import { SymbolTableNode } from "../../analyser/SymbolTable";

export function generateRenderReturn({
    render_stmt, env, option: { should_use_jsx = false, props_name = "props" }
}: generateRenderReturn_Params)
{

}

export type generateRenderReturn_Params = {
    render_stmt: RenderStmt
    env: SymbolTableNode
    option: generateRenderReturn_Option
}

export type generateRenderReturn_Option = {
    should_use_jsx?: boolean
    /** 
     * How the outer `defineComponent` call the `props` arg in the lambda function.
     * By default and convention, it is `props`.
     * 
     * This will control the generated contents for props accessing,
     * since each props is accessed in the form like `props.abc`.
     */
    props_name?: string
}

