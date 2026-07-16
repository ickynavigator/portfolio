import { describe, expect, it } from "vitest";

import ActiveLink from "~/components/ActiveLink.astro";
import { render } from "~/test/client";

describe("ActiveLink Tests", () => {
  it("renders name correctly", async () => {
    const result = await render(ActiveLink, { props: { href: "/about" } });

    expect(result.element()).toBeTruthy();
    expect(result.element()).toBeInstanceOf(HTMLAnchorElement);
  });
});
