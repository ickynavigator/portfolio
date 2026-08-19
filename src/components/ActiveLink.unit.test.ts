import { describe, expect, it } from "vitest";

import ActiveLink from "~/components/ActiveLink.astro";
import { render } from "~/test/client";

describe("ActiveLink Tests", () => {
  it("renders an anchor with the provided href", async () => {
    const result = await render(ActiveLink, { props: { href: "/about" } });

    const el = result.element();
    expect(el).toBeTruthy();
    expect(el).toBeInstanceOf(HTMLAnchorElement);
    expect(el.getAttribute("href")).toBe("/about");
  });
});
