import {
  experimental_AstroContainer as AstroContainer,
  type ContainerRenderOptions,
} from "astro/container";
import {
  render as base_render,
  type RenderOptions,
} from "vitest-browser-astro";

type AstroComponentFactory = Parameters<AstroContainer["renderToString"]>[0];

export async function render_original(
  Component: AstroComponentFactory,
  options: ContainerRenderOptions,
) {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Component, options);

  const template = document.createElement("template");
  template.innerHTML = result;

  return {
    template: template,
    content: template.content,
    stringifiedResult: result,
  };
}

type RenderComponent = Parameters<typeof base_render>[0];
export async function render(
  component: RenderComponent,
  options?: RenderOptions,
) {
  return base_render(component, options);
}
