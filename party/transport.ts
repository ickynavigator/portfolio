import * as z from "zod";

class Transport<
  Discriminant extends string,
  SchemaUnion extends [
    z.core.$ZodTypeDiscriminable,
    ...z.core.$ZodTypeDiscriminable[],
  ],
> {
  private schemaUnion: z.ZodDiscriminatedUnion<SchemaUnion, Discriminant>;
  private discriminant: Discriminant;

  constructor(config: {
    schemaUnion: SchemaUnion;
    discriminant: Discriminant;
  }) {
    this.schemaUnion = z.discriminatedUnion(
      config.discriminant,
      config.schemaUnion,
    );
    this.discriminant = config.discriminant;
  }

  encode(data: unknown) {
    const isValid = this.schemaUnion.safeParse(data);
    if (!isValid.success) {
      throw new Error("Invalid data");
    }
    const processed = JSON.stringify(isValid.data);
    return {
      processed,
    };
  }

  decode(data: unknown) {
    if (typeof data !== "string") {
      throw new Error("Not a string");
    }

    const _parsed = JSON.parse(data);

    const processed = this.schemaUnion.parse(_parsed);
    return {
      processed,
    };
  }

  decodeByDiscriminant<
    Tag extends DiscriminantOptions<typeof this.schemaUnion>,
  >(data: unknown, discriminant: Tag) {
    const _parsed = this.decode(data).processed;
    const _discriminant = (_parsed as Record<Discriminant, unknown>)[
      this.discriminant
    ];
    if (_discriminant !== discriminant) {
      throw new Error("Invalid discriminant");
    }
    const parsed = _parsed as DataByDiscriminant<typeof this.schemaUnion, Tag>;
    return {
      processed: parsed,
    };
  }

  tag<Tag extends DiscriminantOptions<typeof this.schemaUnion>>(
    discriminant: Tag,
    data: Omit<DataByDiscriminant<typeof this.schemaUnion, Tag>, Discriminant>,
  ) {
    const tagged = this.schemaUnion.parse({
      [this.discriminant]: discriminant,
      ...data,
    });

    return {
      tagged,
      encoded: this.encode(tagged).processed,
    };
  }

  match(cbs: MatchMap<typeof this.schemaUnion>) {
    return (data: unknown) => {
      const parsed = this.decode(data).processed;

      type Casted = keyof MatchMap<typeof this.schemaUnion>;
      type Parsed = Record<Discriminant, Casted>;

      const discriminant = (parsed as Parsed)[this.discriminant];
      if (!discriminant) {
        throw new Error("Invalid data");
      }

      const callback = cbs[discriminant];
      if (typeof callback !== "function") {
        throw new Error(
          `NO CALLBACK FOR DISCRIMINANT: ${discriminant.toString()}`,
        );
      }

      return callback(parsed);
    };
  }
}

type DataByDiscriminant<
  T extends z.ZodType,
  Key extends DiscriminantOptions<T>,
> =
  T extends z.ZodDiscriminatedUnion<infer Items, infer Disc>
    ? Disc extends keyof z.infer<Items[number]>
      ? Extract<z.infer<Items[number]>, Record<Disc, Key>>
      : never
    : never;

type DiscriminantOptions<T extends z.ZodType> =
  T extends z.ZodDiscriminatedUnion<infer Items, infer Disc>
    ? Disc extends keyof z.infer<Items[number]>
      ? z.infer<Items[number]>[Disc]
      : never
    : never;

type MatchMap<T extends z.ZodType> =
  T extends z.ZodDiscriminatedUnion<infer Items, infer Disc>
    ? {
        [Key in Items[number] as z.infer<Key> extends Record<
          Disc,
          infer U extends PropertyKey
        >
          ? U
          : never]: (data: z.infer<Key>) => void;
      }
    : never;

export default Transport;
