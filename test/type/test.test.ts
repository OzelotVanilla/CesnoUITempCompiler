import jsTokens from "js-tokens";
import {parser} from "../../src/parser.js"

test("parse", () => {
    // console.log(parser.parse('state state_name = 0').toString())
    const component = parser.parse('component ComponentName(props, child){ render (<div></div>)}').toString()
    expect(component).toBe('File(CompentDef("(",props,",",child,")",Block(RenderStmt(render,"(","<div></div>",")"))))')
    console.log(component)
})