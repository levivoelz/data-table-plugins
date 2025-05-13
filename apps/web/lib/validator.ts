import { z } from "zod";

const schema = z.object({
  headers: z.array(z.string()),
  rows: z.array(z.array(z.unknown())),
});

export type Schema = z.infer<typeof schema>;

export function parse(data: Schema): Schema {
  // The headers length should match all the rows length
  const headersLength = data.headers.length;

  for (let i = 0; i < data.rows.length; i++) {
    const row = data.rows[i];

    if (row && headersLength !== row.length) {
      throw new Error("One or more rows have length that does not match the headers length")
    }
  }

  return schema.parse(data);
}
