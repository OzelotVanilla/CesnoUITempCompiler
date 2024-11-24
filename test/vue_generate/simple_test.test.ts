import { CesMLExpression } from "../../src/analyser/expression_types/CesMLExpression"
import { IdentifierExpression, IdentifierType } from "../../src/analyser/expression_types/IdentifierExpression"
import { BinaryExpression, BinaryOperator, OperandfulExpression } from "../../src/analyser/expression_types/OperandfulExpression"
import { ValueExpression } from "../../src/analyser/expression_types/ValueExpression"
import { ComponentDefStmt } from "../../src/analyser/statement_types/ComponentDefStmt"
import { RenderStmt } from "../../src/analyser/statement_types/RenderStmt"
import { StateDefStmt } from "../../src/analyser/statement_types/StateDefStmt"
import { VarDefStmt } from "../../src/analyser/statement_types/VarDefStmt"
import { Generator, GeneratorTarget } from "../../src/generator/Generator"
import { AcceptableType, AcceptableTypeName } from "../../src/util/compiler_acceptable_types"

const p_0 = new CesMLExpression({
    component: "p",
    props: { colour: new AcceptableType.String({ value: "#decafe" }) },
    children: null
})

const stmts = [
    new ComponentDefStmt({
        name: "Box", has_children: true, def_body: [
            new StateDefStmt({
                name: "state_name", type: AcceptableTypeName.number,
                init_expr: new ValueExpression({ value: new AcceptableType.Number({ value: 0 }) })
            }),
            new VarDefStmt({
                name: "temp_var_name", type: AcceptableTypeName.number,
                init_expr: new BinaryExpression({
                    operand_left: new IdentifierExpression({ type: IdentifierType.state, name: "state_name" }),
                    operator: BinaryOperator.plus,
                    operand_right: new ValueExpression({ value: new AcceptableType.Number({ value: 1 }) })
                })
            }),
            new RenderStmt({
                ui_tree: [
                    new CesMLExpression({
                        component: "div",
                        children: new IdentifierExpression({ type: IdentifierType.variable, name: "temp_var_name" })
                    }),
                    new CesMLExpression({
                        component: "div",
                        children: new IdentifierExpression({ type: IdentifierType.child, name: "child" })
                    })
                ]
            })
        ]
    }),
    new ComponentDefStmt({
        name: "App", has_children: false, def_body: [
            new RenderStmt({
                ui_tree: new CesMLExpression({
                    component: "Box",
                    children: "abc"
                })
            })
        ]
    })
]

test(
    `Simple example`,
    function ()
    {
        const generator = new Generator({ target: GeneratorTarget.vue })
        console.log(generator.generateFromStatements(stmts))
    }
)