import { Field } from "payload/types";
import { z } from "zod";

/**
 * Converts Zod field with given type to a corresponding Payload field.
 * @param name Name of the Zod field to convert.
 * @param zodType Data type of the field to convert.
 * @returns Payload Field definition suitable for use in Payload collections.
 */
function toPayloadZodField(name: string, zodType: z.ZodTypeAny): Field {
  const required = zodType.isOptional() ? {} : { required: true };
  const field = {
    name: name,
    ...required,
  };

  // zod types are matched by type name as matching with instanceof breaks bundler
  const typeName = zodType._def.typeName;

  if (typeName === "ZodString") {
    return { ...field, type: "text" };
  } else if (typeName === "ZodNumber") {
    return { ...field, type: "number" };
  } else if (typeName === "ZodArray") {
    return {
      ...field,
      type: "array",
      // convert nested type stored in array
      fields: toPayloadZod((zodType as z.ZodArray<any>).element),
    };
  } else if (typeName === "ZodNativeEnum") {
    return {
      ...field,
      type: "select",
      // unpack enum entries as select options
      // typescript encodes enums are encoded as bidirectional dictionary
      // with both entries from option -> value and value -> option
      // use zod parsing to select only the options -> value entries
      options: Object.entries((zodType as z.ZodNativeEnum<any>).enum)
        .filter(([_, right]) => zodType.safeParse(right).success)
        .map(([option, value]) => {
          return { label: option, value: `${value}` };
        }),
    };
  } else if (typeName === "ZodOptional") {
    return {
      ...toPayloadZodField(name, (zodType as z.ZodOptional<any>).unwrap()),
      // override nested field required true with false
      ...field,
    };
  } else {
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
