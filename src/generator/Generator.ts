import { ComponentDefStmt } from "../analyser/statement_types/ComponentDefStmt"
import { FunctionDefStmt } from "../analyser/statement_types/FunctionDefStmt"
import { RenderStmt } from "../analyser/statement_types/RenderStmt"
import { StmtNode } from "../analyser/statement_types/StmtNode"
import { tsifyExpression, tsifyStatement } from "./vue/tsify"

export class Generator
{
    public readonly option: Generator_Args

    constructor(option: Generator_Args)
    {
        this.option = option
    }

    public generateFromStatements(stmts: StmtNode[])
    {
        switch (this.option.target)
        {
            case GeneratorTarget.react: return this.generateReactCode(stmts)
            case GeneratorTarget.vue: return this.generateVueCode(stmts)
            default: throw TypeError(`Target ${(this.option as Generator_Args).target} is not implemented.`)
        }
    }

    private generateReactCode(stmts: StmtNode[])
    {
        if (this.option.target != GeneratorTarget.react) { throw TypeError(`Target not set to react but "${this.option.target}".`) }

    }

    private generateVueCode(stmts: StmtNode[])
    {
        if (this.option.target != GeneratorTarget.vue) { throw TypeError(`Target not set to vue but "${this.option.target}".`) }
        const main_component = stmts.filter(s => s instanceof ComponentDefStmt && s.name == "App")[0] as ComponentDefStmt
        const comp_define_stmts = stmts.filter(s => s instanceof ComponentDefStmt && s.name != "App")

        return `
        <script setup lang=${this.option.should_use_jsx ? "tsx" : "ts"}>
            import { defineComponent, ref, h } from "vue"
            ${comp_define_stmts.map(stmt => tsifyStatement({ stmt })).join("\n")}
            ${main_component.def_body.filter(s => !(s instanceof RenderStmt)).map(stmt => tsifyStatement({ stmt })).join("\n")}
        </script>

        <template>
            ${main_component.def_body.filter(s => s instanceof RenderStmt)[0].ui_tree.map(s => s.ts_repr).join("\n")}
        </template>
        `
    }

    public generateFunction(stmt: FunctionDefStmt)
    {

    }
}

function generateFromStmts(stmts: StmtNode[], args: Generator_Args = { target: GeneratorTarget.react })
{
    return new Generator(args).generateFromStatements(stmts)
}

type Generator_Args =
    // For react option.
    | {
        target: GeneratorTarget.react
    }
    // For vue option.
    | {
        target: GeneratorTarget.vue;
        should_use_jsx?: boolean
    }

export enum GeneratorTarget
{
    react,
    vue
}