export abstract class NameDefStmt
{
    public readonly name

    constructor({ name }: NameDefStmt_Args)
    {
        this.name = name
    }
}

export type NameDefStmt_Args = {
    name: string
}