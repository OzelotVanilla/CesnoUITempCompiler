/**
 * This file stores general resource for the ts-ify process of Cesno code.
 */

/**
 * Stands for the object that can be directly convert into TypeScript object.
 */
export interface HasTypeScriptRepresentation
{
    /** The text representation (in TypeScript) for this object. */
    get ts_repr(): string
}