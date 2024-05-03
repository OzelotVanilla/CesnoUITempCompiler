export enum ScopeType
{
    namespace = "namespace",
    class = "class",
    function = "function",
    code_block = "code_block"
}

export class Scope
{
    private scope_stack: ScopeLevel[]

    /**
     * Enter a new scope.
     */
    public enter(scope: ScopeLevel)
    {
        this.scope_stack.push(scope)
    }

    /**
     * Exit current scope. If already at global, an error is given.
     */
    public exit()
    {
        if (this.scope_stack.length <= 0) { throw RangeError(`Already at global scope, cannot exit more.`) }

        this.scope_stack.pop()
    }

    /**
     * Reset the scope to global.
     */
    public reset()
    {
        this.scope_stack = []
    }

    public [Symbol.toPrimitive](hint: "string" | "number")
    {
        if (hint != "string") { throw TypeError(`Scope can only be converted to string, not "${hint}"`) }

        return this.toString()
    }

    public *[Symbol.iterator]()
    {
        for (const s of this.scope_stack) { yield s }
    }

    public toString()
    {
        let result: string = ""

        if (this.scope_stack.length > 0)
        {
            result = this.scope_stack
                .map(e => `${e.type} "${e.name}"`)
                .reduce((prev, curr, i) => `${prev}\n${" ".repeat(i + 2)}${curr}`)
        }

        return `Scope:\n <global>\n  ${result}`
    }

    public static readonly ordered_scope = [ScopeType.code_block]

    public get is_ordered_scope()
    {
        // If empty stack, must be global.
        return Scope.ordered_scope.includes(this.scope_stack.at(-1)?.type ?? ScopeType.namespace)
    }

    public get last_level_name() { return this.scope_stack.at(-1)?.name ?? "global" }

    constructor(scopes: ScopeLevel[] = [])
    {
        this.scope_stack = scopes
    }

    /** A global scope. */
    public static ofGlobal()
    {
        return new Scope([])
    }

    /** Get a new scope after entering a  */
    public afterEntering(scope: ScopeLevel)
    {
        return new Scope([...this.scope_stack, scope])
    }

    public afterExiting(n_level: number)
    {
        if (n_level < 0) { throw RangeError(`Cannot have an exiting level less than 0 (got ${n_level}).`) }

        let exiting_stop_at = this.scope_stack.length - n_level
        if (exiting_stop_at < 0) { exiting_stop_at = 0 }

        return new Scope(this.scope_stack.slice(0, exiting_stop_at))
    }

    public atOuterLevel()
    {
        return this.afterExiting(1)
    }
}

export type ScopeLevel = {
    type: ScopeType
    name: string
}