import { Scope } from "./Scope"
import { NameDefStmt, NameType } from "./statement_types/NameDefStmt"

/**
 * Store the definitions in a tree shape.
 * Each node (`SymbolTableNode`) represents a scope, while it contains the definition of symbols.
 * 
 * ### Example
 * 
 * node (scope: at function `f`) has following symbol:
 * * variable `a`
 * * function `g` (another node)
 * * constant `b`
 * 
 * It has following descendant node:
 * * function `g`
 */
export class SymbolTable
{
    private store = SymbolTableNode.ofGlobal()

    public getNode({ scope }: { scope: Scope })
    {
        let result = this.store
        for (const s of scope)
        {
            let node = result.getDescendantNodeOf({ name: s.name })
            if (node == undefined) { throw ReferenceError(`Scope "${s.name}" (${s.type}) does not exist in ${result.scope}.`) }
            result = node
        }

        return result
    }

    /**
     * Create a new symbol table node.
     * This will create a new node as a descendant of an **existing node**.
     */
    public addNode({ scope }: { scope: Scope })
    {
        const outer_node = this.getNode({ scope: scope.atOuterLevel() })
        new SymbolTableNode({ outer_node, scope })
    }
}

type Sign__For_Input = {
    def_stmt: NameDefStmt
}

type Sign_Args = {

} & Sign__For_Input

class Sign
{
    public readonly def_stmt: NameDefStmt
    public get name() { return this.def_stmt.name }
    public get type() { return this.def_stmt.stmt_type }

    constructor({ def_stmt }: Sign_Args)
    {
        this.def_stmt = def_stmt
    }
}

export type { SymbolTableNode }

class SymbolTableNode
{
    public readonly id: number
    /** The outer node (representing a outer scope) of this node. */
    public readonly outer_node: SymbolTableNode | null
    /** The current scope name and type of this node. */
    public readonly scope: Scope
    public get name() { return this.scope.last_level_name }
    public readonly symbols: Sign[]
    private __descendant_nodes: SymbolTableNode[] = []
    public get descendant_nodes() { return [...this.__descendant_nodes] as const }
    public readonly is_symbols_ordered: boolean

    private static id_counter = 1

    public getSymbol({ name, from_name = null }: getSymbol_Params): Sign | undefined
    {
        // First search current scope about this name.
        // If the symbol is ordered, cannot find name after the node that is after the searching source.
        if (this.is_symbols_ordered && from_name != null)
        {
            for (const sym of this.symbols)
            {
                if (sym.name == from_name) { break } // No available result here. Need to search outer level.
                if (sym.name == name) { return sym }
            }
        }
        // Not ordered, or no specified search stop point (`from_name`), see if matching symbols.
        else 
        {
            const result = this.symbols.find(e => e.name == name)
            if (result != undefined) { return result }
            // else, need to search outer level.
        }

        // No result in this level, find in outer level.
        if (this.outer_node != null) { return this.outer_node.getSymbol({ name, from_name: this.name }) }
        // Already at global scope ?
        else { return undefined }
    }

    public addSymbol({ def_stmt }: Sign__For_Input)
    {
        this.symbols.push(new Sign({ def_stmt }))
    }

    public getDescendantNodeOf({ name }: { name: string })
    {
        return this.__descendant_nodes.find(e => e.name == name)
    }

    constructor({ outer_node, scope, symbols = [] }: SymbolTableNode_Args)
    {
        this.id = SymbolTableNode.id_counter++
        this.outer_node = outer_node
        this.scope = scope
        this.symbols = symbols
        this.is_symbols_ordered = scope.is_ordered_scope
        outer_node?.__descendant_nodes.push(this)
    }

    public static ofGlobal()
    {
        return new SymbolTableNode({
            outer_node: null,
            scope: Scope.ofGlobal()
        })
    }

    public [Symbol.toPrimitive](hint: "string" | "number")
    {
        if (hint != "string") { throw TypeError(`SymbolTable can only be converted to string, not "${hint}"`) }

        return this.toString()
    }

    public toString()
    {
        let symbol_definitions: string = "<none>"
        if (this.symbols.length > 0)
        {
            symbol_definitions = this.symbols
                .map(e => `\n  * ${e.name}: ${e.def_stmt.stmt_type}`)
                .join("")
        }

        return `SymbolTableNode:\n ${this.scope.toString().replace(/\n/g, "\n ")}\n `
            + `Symbol:${symbol_definitions}`
    }
}

type SymbolTableNode_Args = {
    /** The outer node (representing a outer scope) of this node. Be `null` if this node is global scoped. */
    outer_node: SymbolTableNode | null
    /** The current scope name and type of this node. */
    scope: Scope
    symbols?: Sign[]
}

type getSymbol_Params = {
    /** The name of the symbol wants to find. */
    name: string
    /** The name for the searching to stop. */
    from_name?: string | null
}