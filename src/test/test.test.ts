import { equal, numerical, state_token } from "./test_helper"
import jsTokens from "js-tokens";
import {parser} from "../../src/parser.js"

test("parseStateStmt", () => {
    console.log(parser.parse('one 2 one "three"').toString())
})