import { FunctionDefStmt } from "../analyser/statement_types/FunctionDefStmt"
import { StmtNode } from "../analyser/statement_types/StmtNode"

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

        return `
        <script setup lang=${this.option.should_use_jsx ? "tsx" : "ts"}>
            import { defineComponent } from "vue"
        </script>

        <template>
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

enum GeneratorTarget
{
    react,
    vue
}