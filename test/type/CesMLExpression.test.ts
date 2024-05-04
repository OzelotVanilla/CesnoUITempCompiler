import { CesMLExpression } from "../../src/analyser/expression_types/CesMLExpression"
import { AcceptableType } from "../../src/util/compiler_acceptable_types"

const p_0 = new CesMLExpression({
    component: "p",
    props: { colour: new AcceptableType.String({ value: "#decafe" }) },
    children: null
})

test(
    `Repr output of CesMLExpression`,
    function ()
    {
        expect(p_0.repr).toMatch(/\<p\s+colour\=\{"\#decafe"\}\>\s*\<\/p\>/)
    }
)