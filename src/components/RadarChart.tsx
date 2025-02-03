import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartRadarChart,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";

interface RadarChartProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  config: ChartConfig<T>;
  data: T[];
  angleKey: OneOf<keyof T, string>;
}

const RadarChart = <T extends Record<string, unknown>>(
  props: RadarChartProps<T>,
) => {
  const { angleKey, config, data } = props;

  return (
    <ChartContainer config={config} className="mx-auto max-h-62.5">
      <RechartRadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey={angleKey} />
        <PolarGrid />
        {Object.keys(config).map((key) => (
          <Radar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            fillOpacity={0.6}
          />
        ))}
      </RechartRadarChart>
    </ChartContainer>
  );
};

export default RadarChart;
