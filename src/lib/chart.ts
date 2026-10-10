import {
  barX,
  defineChart,
  mountChart,
  text,
  type Channel,
  type ChartHost,
  type ChartValue,
} from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";

import { ComponentBase } from "~/lib/utils.client";

interface ChartOptions<TDatum> {
  data: TDatum[];
  xAxis: Channel<TDatum, number | null | undefined>;
  yAxis: Channel<TDatum, ChartValue | null | undefined>;
  getValue: (datum: TDatum) => number | null | undefined;
  formatText: (datum: TDatum) => string;
}
function makeChart<TDatum>(options: ChartOptions<TDatum>) {
  return defineChart(
    {
      marks: [
        barX(options.data, {
          id: "chart-bars",
          x: options.xAxis,
          y: options.yAxis,
          radius: 8,
        }),

        text(options.data, {
          id: "chart-text",
          x: (_, ctx) =>
            Math.max(
              ...ctx.data.map(options.getValue).filter((x) => x != null),
            ),
          y: options.yAxis,
          text: options.formatText,
          anchor: "end",
          dx: -8,
          fill: "var(--foreground)",
          fontSize: 12,
        }),
      ],

      scales: {
        x: {
          scale: scaleLinear,
          axis: false,
        },
        y: {
          scale: scalePoint,
          axis: { line: false, ticks: { size: 0 } },
        },
      },

      focus: false,
      keyboard: false,

      theme: {
        foreground: "var(--muted-foreground, var(--muted))",
        grid: "var(--border)",
        background: "transparent",
        palette: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"],
      },
    },
    {},
  );
}

export class ChartBase<TDatum> extends ComponentBase {
  host: ChartHost<TDatum, ChartValue, ChartValue> | null = null;

  disconnectedCallback() {
    this.unmount();
  }

  mount(options: { chartOptions: ChartOptions<TDatum>; label: string }) {
    if (this.host) {
      this.unmount();
    }

    const host = mountChart<TDatum>(this, {
      definition: makeChart(options.chartOptions),
      ariaLabel: options.label,
    });

    this.host = host;

    return host;
  }

  unmount() {
    this.host?.destroy();
    this.host = null;
  }
}
