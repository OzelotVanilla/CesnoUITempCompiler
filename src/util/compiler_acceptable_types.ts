import { HasTypeScriptRepresentation } from "../generator/tsify"
import { HasCesnoRepresentation } from "./HasCesnoRepresentation"

export enum AcceptableTypeName
{
    object = "object",
    number = "number",
    string = "string",
    bool = "bool",
    array = "array"
}

export namespace AcceptableType
{
    export abstract class BaseObject implements HasCesnoRepresentation, HasTypeScriptRepresentation
    {
        public static readonly class_type: AcceptableTypeName = AcceptableTypeName.object
        public get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.object }) }

        public abstract get repr(): string

        public abstract get ts_repr(): string

        constructor({ }: BaseObject_Args)
        {

        }
    }

    export class Number extends BaseObject
    {
        public static override readonly class_type = AcceptableTypeName.number
        public override get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.number }) }

        public get repr() { return this.value.toString() }

        public get ts_repr() { return this.repr }

        public readonly value: number

        constructor({ value }: Number_Args)
        {
            super({})
            this.value = value
        }
    }

    export class String extends BaseObject
    {
        public static override readonly class_type = AcceptableTypeName.string
        public override get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.string }) }

        public get repr() { return `"${this.value}"` }

        public get ts_repr() { return this.repr }

        public value: string

        constructor({ value }: String_Args)
        {
            super({})
            this.value = value
        }
    }

    export class Bool extends BaseObject
    {
        public static override readonly class_type = AcceptableTypeName.bool
        public override get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.bool }) }

        public get repr() { return this.value.toString() }

        public get ts_repr() { return this.repr }

        public readonly value: boolean

        constructor({ value }: Bool_Args)
        {
            super({})
            this.value = value
        }
    }

    export class Array<EleType extends AcceptableType.BaseObject> extends BaseObject
    {
        public static override readonly class_type = AcceptableTypeName.array
        public override get type()
        {
            return AcceptableType.Type.make({
                class_name: AcceptableTypeName.array,
                generics: { EleType: this.element_type }
            })
        }

        public get repr() { return `[${this.elements.map(e => e.repr).join(", ")}]` }

        public get ts_repr() { return this.repr }

        public readonly element_type: AcceptableType.Type

        public readonly elements: EleType[]

        constructor({ element_type, elements = [] }: Array_Args<EleType>)
        {
            super({})
            this.elements = elements
            this.element_type = toAcceptableType(element_type)
        }
    }

    export class Type<GenericsParam extends string = string>
    {
        public readonly class_name: AcceptableTypeName
        public readonly generics: Record<GenericsParam, AcceptableType.Type> | null

        public [Symbol.toPrimitive](hint: "string" | "number")
        {
            if (hint != "string") { throw TypeError(`AcceptableType.Type can only be converted to string, not "${hint}"`) }

            return this.repr
        }

        public get repr()
        {
            if (this.generics == null) { return `${this.class_name}` }
            else
            {
                let generics_string = Object.entries(this.generics).flatMap(([_, type]) => `${type}`).join(", ")
                return `${this.class_name}<${generics_string}>`
            }
        }

        private constructor({ class_name, generics = null }: Type_Args)
        {
            this.class_name = class_name
            this.generics = generics
        }

        public static make<InferredGenericsType extends (Record<string, AcceptableType.Type | AcceptableTypeName> | null)>(
            { class_name, generics = null as InferredGenericsType }: { class_name: AcceptableTypeName, generics?: InferredGenericsType }
        ): AcceptableType.Type<Extract<keyof InferredGenericsType, string>>
        {
            return new AcceptableType.Type({
                class_name,
                generics: generics != null
                    ? normaliseAcceptableTypeName(generics)
                    : null
            })
        }

        /**
         * Check the equality of two types.
         * 
         * Steps:
         * * If the class name not equal, must be different type.
         * * If one generics is null, must be different.
         * 
         * @param another Another type to check.
         * @returns Whether this two type are the same.
         */
        public equals(another: AcceptableType.Type): boolean
        {
            if (this.class_name != another.class_name) { return false }
            // Else, the class name are the same:
            if (this.generics == another.generics) { return true }
            if (this.generics == null || another.generics == null) { return false }

            // Else, must compare two generics
            const [generics_name_a, generics_name_b] =
                [Object.keys(this.generics!).toSorted(), Object.keys(another.generics!).toSorted()]

            return generics_name_a.every(
                (name, index) =>
                    generics_name_b[index] == name
                    && this.generics![name as GenericsParam].equals(another.generics![name as GenericsParam])
            )
        }

    }

    export type BaseObject_Args = {

    }

    export type Number_Args = {
        value: number
    } & BaseObject_Args

    export type String_Args = {
        value: string
    } & BaseObject_Args

    export type Bool_Args = {
        value: boolean
    } & BaseObject_Args

    export type Array_Args<EleType> = BaseObject_Args & {
        elements?: EleType[],
        element_type: AcceptableType.Type | AcceptableTypeName
    }

    export type Type_Args = {
        class_name: AcceptableTypeName
        generics?: Record<string, AcceptableType.Type> | undefined | null
    }

}

export function toAcceptableType(type: AcceptableType.Type | AcceptableTypeName): AcceptableType.Type
{
    return type instanceof AcceptableType.Type
        ? type
        : AcceptableType.Type.make({ class_name: type })
}

export function normaliseAcceptableTypeName(
    obj: Record<string, AcceptableType.Type | AcceptableTypeName>
): Record<string, AcceptableType.Type>
{
    return Object.fromEntries(Object.entries(obj).map(
        (([generics_name, generics_type]) => [generics_name, toAcceptableType(generics_type)])
    ))
}