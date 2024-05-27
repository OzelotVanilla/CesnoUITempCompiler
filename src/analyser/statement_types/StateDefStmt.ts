import { NameDefStmt } from "./NameDefStmt"

export class StateDefStmt extends NameDefStmt
{
    public readonly value: any

    constructor({ name, value}: any)
    {
        super({ name })
        this.value = value
    }
}