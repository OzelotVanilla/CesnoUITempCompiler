export enum AcceptableTypeName
{
    object = "object",
    number = "number",
    string = "string",
    component = "component",
    array = "array"
}

export namespace AcceptableType
{
    export class BaseObject
    {
        public static readonly class_type: AcceptableTypeName = AcceptableTypeName.object
        public get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.object }) }

        constructor({ }: BaseObject_Args)
        {

        }
    }

    export class Number extends BaseObject
    {
        public static override readonly class_type = AcceptableTypeName.number
        public override get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.number }) }
    }

    export class String extends BaseObject
    {
        public static override readonly class_type = AcceptableTypeName.string
        public override get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.string }) }
    }

    export class Component extends BaseObject
    {
        public static override readonly class_type = AcceptableTypeName.component;
        public override get type() { return AcceptableType.Type.make({ class_name: AcceptableTypeName.component }) }
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

        public readonly element_type: AcceptableType.Type

        public readonly elements: EleType[]

        constructor({ element_type, elements = [] }: Array_Args<EleType>)
        {
            super({})
            this.elements = elements
            this.element_type = element_type instanceof AcceptableType.Type
                ? element_type
                : AcceptableType.Type.make({ class_name: element_type })
        }
    }

    export class Type<GenericsParam extends string = string>
    {
        public readonly class_name: AcceptableTypeName
        public readonly generics: Record<GenericsParam, AcceptableType.Type> | null

        public [Symbol.toPrimitive](hint: "string" | "number")
        {
            if (hint != "string") { throw TypeError(`AcceptableType.Type can only be converted to string, not "${hint}"`) }

            if (this.generics == null) { return `${this.class_name}` }
            else
            {
                // 
                let generics_string = Object.entries(this.generics).flatMap(([_, type]) => `${type}`).join(",")
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
            type GenericNormFunc = (param: [string, AcceptableType.Type | AcceptableTypeName]) => [string, AcceptableType.Type]

            return new AcceptableType.Type({
                class_name,
                generics: generics != null
                    ? Object.fromEntries(Object.entries(generics).map(
                        (([generics_name, generics_type]) =>
                            [
                                generics_name,
                                generics_type instanceof AcceptableType.Type
                                    ? generics_type
                                    : AcceptableType.Type.make({ class_name: generics_type })
                            ]) as GenericNormFunc
                    ))
                    : null
            })
        }
    }

    export type BaseObject_Args = {

    }

    export type Array_Args<EleType> = BaseObject_Args & {
        elements?: EleType[],
        element_type: AcceptableType.Type | AcceptableTypeName
    }

    export type Type_Args = {
        class_name: AcceptableTypeName
        generics?: Record<string, AcceptableType.Type> | undefined | null
    }
}