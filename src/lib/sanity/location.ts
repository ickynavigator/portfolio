import { type PresentationPluginOptions } from "sanity/presentation";

type Locations = NonNullable<
  NonNullable<PresentationPluginOptions["resolve"]>["locations"]
>;

const resolver: Locations = {};

export default resolver;
