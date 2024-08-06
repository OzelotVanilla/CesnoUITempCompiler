import { TokenType } from "../../src/tokeniser/TokenType"

export function state_token() {
    return {
        type: TokenType.definition_word,
        content: "state"
    }
}

export function identifier(name: string) {
    return {
        type: TokenType.identifier,
        content: name
    }
}

export function equal() {
    return {
        type: TokenType.equal,
        content: "="
    }
}

export function numerical(num: number) {
    return {
        type: TokenType.numerical,
        content: num
    }
}

export function component_token() {
    return {
        type: TokenType.definition_word,
        content: "component"
    }
}

export function left_paren() {
    return {
        type: TokenType.left_paren,
        content: "("
    }
}

export function right_paren() {
    return {
        type: TokenType.right_paren,
        content: ")"
    }
}

export function left_brace() {
    return {
        type: TokenType.left_brace,
        content: "{"
    }
}

export function comma() {
    return {
        type: TokenType.comma,
        content: ","
    }
}

export function right_brace() {
    return {
        type: TokenType.right_brace,
        content: "}"
    }
}

export function plus() {
    return {
        type: TokenType.plus,
        content: "+"
    }
}

export function minus() {
    return {
        type: TokenType.minus,
        content: "-"
    }
}

export function divide() {
    return {
        type: TokenType.divide,
        content: "/"
    }
}

export function dot() {
    return {
        type: TokenType.dot,
        content: "."
    }
}