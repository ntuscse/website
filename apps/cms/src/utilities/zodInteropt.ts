import { Field } from "payload/types";
import { z } from "zod";

/**
 * Converts Zod field with given type to a corresponding Payload field.
 * @param name Name of the Zod field to convert.
 * @param zodType Data type of the field to convert.
 * @returns Payload Field definition suitable for use in Payload collections.
 */
function toPayloadZodField(
  name: string,
  zodType: z.ZodFirstPartySchemaTypes
): Field {
  const required = zodType.isOptional() ? {} : { required: true };
  const field = {
    name: name,
    ...required,
  };

  // zod types are matched by type name as matching with instanceof breaks bundler
  switch (zodType._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodString:
      return { ...field, type: "text" };
    case z.ZodFirstPartyTypeKind.ZodNumber:
      return { ...field, type: "number" };
      break;
    case z.ZodFirstPartyTypeKind.ZodArray:
      return {
        ...field,
        type: "array",
        // convert nested type stored in array
        fields: toPayloadZod(
          (zodType as z.ZodArray<z.ZodObject<z.ZodRawShape>>).element
        ),
      };
    case z.ZodFirstPartyTypeKind.ZodNativeEnum:
      return {
        ...field,
        type: "select",
        // unpack enum entries as select options
        // typescript encodes enums are encoded as bidirectional dictionary
        // with both entries from option -> value and value -> option
        // use zod parsing to select only the options -> value entries
        options: Object.entries((zodType as z.ZodNativeEnum<z.EnumLike>).enum)
          .filter(([_, right]) => zodType.safeParse(right).success)
          .map(([option, value]) => {
            return { label: option, value: `${value}` };
          }),
      };

    case z.ZodFirstPartyTypeKind.ZodOptional:
      return {
        ...toPayloadZodField(
          name,
          (zodType as z.ZodOptional<z.ZodTypeAny>).unwrap()
        ),
        // override nested field required true with false
        ...field,
      };

    default:
      throw new Error(
        `Unable to convert unsupported Zod type: ${JSON.stringify(
          zodType,
          null,
          2
        )}`
      );
  }
}

/**
 * Converts Zod Object into Payload field definitions.
 * @param zodObject Zod Object to convert.
 * @returns List of Payload fields corresponding to the fields of the Zod object.
 */
export function toPayloadZod(zodObject: z.ZodObject<z.ZodRawShape>): Field[] {
  return Object.entries(zodObject.shape).map(([name, zodType]) =>
    toPayloadZodField(name, zodType)
  );
}
