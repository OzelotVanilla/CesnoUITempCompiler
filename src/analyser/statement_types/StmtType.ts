export enum StmtType
{
    /**
     * Definition of a component.
     */
    component_def = "component_def",

    /**
     * Definition of state.
     */
    state_def = "state_def",

    /**
     * Definition of dependent variable.
     * 
     * ```plaintext
     * state x;
     * let y = x + 1; // depen_val_def
     * ```
     */
    depen_val_def = "depen_val_def",

    /**
     * Definition of the content for a component to render.
     */
    render = "render"
}