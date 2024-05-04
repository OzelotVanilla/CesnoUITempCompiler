import { AcceptableType, AcceptableTypeName, toAcceptableType } from "../../src/util/compiler_acceptable_types"

const generics_record_array_0 = { EleType: toAcceptableType(AcceptableTypeName.number) }

const type_array_0 = AcceptableType.Type.make({
    class_name: AcceptableTypeName.array,
    generics: generics_record_array_0
})

const type_array_1 = AcceptableType.Type.make({
    class_name: AcceptableTypeName.array,
    generics: generics_record_array_0
})

const type_array_2 = AcceptableType.Type.make({
    class_name: AcceptableTypeName.array,
    generics: { EleType: AcceptableType.Type.make({ class_name: AcceptableTypeName.number }) }
})

const type_array_3 = AcceptableType.Type.make({
    class_name: AcceptableTypeName.array,
    generics: { EleType: AcceptableType.Type.make({ class_name: AcceptableTypeName.bool }) }
})

test(
    "Test `AcceptableType.Type.equals` functionality",
    function ()
    {
        expect(type_array_0.equals(type_array_1)).toBe(true)
        expect(type_array_0.equals(type_array_2)).toBe(true)
        expect(type_array_0.equals(type_array_3)).toBe(false)
    }
)