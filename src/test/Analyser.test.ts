import { getNextToken, parseState } from "../analyser/Analyser"
import { StateDefStmt } from "../analyser/statement_types/StateDefStmt"
import { equal, identifier, numerical, state_token } from "./test_helper"

// test("parseStateStmt", () => {
//     const t = [state_token(), identifier("state_name"),
//     equal(), numerical(0)]
//     expect(parseState(t))
//         .toStrictEqual(new StateDefStmt({"state_name": 0}))
// })

// test("getNextToken" , () => {
//     const t = [state_token(), identifier("state_name"),
//     equal(), numerical(0)]
//     expect(getNextToken(t))
//         .toStrictEqual([identifier("state_name"),
//         equal(), numerical(0)])
// })

test("empty",()=>{})