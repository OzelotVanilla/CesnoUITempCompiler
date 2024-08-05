import { Scope, ScopeType } from "../../src/analyser/Scope"
import { SymbolTable } from "../../src/analyser/SymbolTable"
import { VarDefStmt } from "../../src/analyser/statement_types/VarDefStmt"
import { ConstDefStmt } from "../../src/analyser/statement_types/ConstDefStmt"
import { AcceptableType, AcceptableTypeName, toAcceptableType } from "../../src/util/compiler_acceptable_types"

test(
    "The basic I/O of symbol table.",
    function ()
    {
        const table = new SymbolTable()
        table.addNode({ scope: new Scope([{ name: "f", type: ScopeType.function }]) })
        table.addNode({ scope: new Scope([{ name: "f", type: ScopeType.function }, { name: "g", type: ScopeType.function }]) })
        const f_g_node = table.getNode({
            scope: new Scope([{ name: "f", type: ScopeType.function }, { name: "g", type: ScopeType.function }])
        })
        f_g_node.addSymbol({
            name: "a",
            def_stmt: new VarDefStmt({ name: "a", type: AcceptableType.Type.make({ class_name: AcceptableTypeName.number }) })
        })
        f_g_node.addSymbol({
            name: "b",
            def_stmt: new ConstDefStmt({ name: "b", type: AcceptableType.Type.make({ class_name: AcceptableTypeName.string }) })
        })

        expect(
            table.getNode({ scope: Scope.ofGlobal() })
                .getDescendantNodeOf({ name: "f" })!
                .getDescendantNodeOf({ name: "g" })
        ).toBeTruthy()
    }
)