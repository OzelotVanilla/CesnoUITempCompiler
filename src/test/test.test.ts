import { equal, numerical, state_token } from "./test_helper"
import jsTokens from "js-tokens";

test("parseStateStmt", () => {
    console.log(Array.from(jsTokens("function test() { state state_name = 0; }")))
})