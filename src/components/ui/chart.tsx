"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  TooltipProps,
  Legend as RechartsLegend,
  LegendProps,
} from "recharts";

import { cn } from "@/lib/utils";

// Themes for dynamic chart colors
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used inside <ChartContainer />");
  return ctx;
}

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof ResponsiveContainer>["children"];
}) {
  const unique = React.useId().replace(/:/g, "");
  const chartId = `chart-${id || unique}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line]:stroke-border/40",
          "[&_.recharts-reference-line_]:stroke-border",
          "[&_.recharts-sector]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export function ChartStyle({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) {
  const entries = Object.entries(config).filter(
    ([, item]) => item.color || item.theme
  );

  if (!entries.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = entries
        .map(([key, item]) => {
          const color =
            item.theme?.[theme as keyof typeof item.theme] || item.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");

      return `
${prefix} [data-chart=${id}] {
${vars}
}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/* -------------------------------------------------------------------------- */
/*                             Tooltip Component                              */
/* -------------------------------------------------------------------------- */

export function ChartTooltip(props: TooltipProps<number, string>) {
  return <RechartsTooltip {...props} content={<ChartTooltipContent />} />;
}

export function ChartTooltipContent(
  props: TooltipProps<number, string> & {
    className?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "dot" | "line" | "dashed";
    labelKey?: string;
    nameKey?: string;
  }
) {
  const {
    active,
    payload,
    label,
    className,
    hideLabel = false,
    hideIndicator = false,
    indicator = "dot",
    labelFormatter,
    formatter,
    labelKey,
    nameKey,
  } = props;

  const { config } = useChart();

  if (!active || !payload || !payload.length) return null;

  const first = payload[0];
  const key = `${labelKey || first.name || first.dataKey || "value"}`;
  const itemCfg = getPayloadConfig(config, first, key);

  const finalLabel =
    labelFormatter?.(label, payload) ??
    itemCfg?.label ??
    (typeof label === "string" ? label : "");

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel && finalLabel && (
        <div className="font-medium">{finalLabel}</div>
      )}

      <div className="grid gap-1.5">
        {payload.map((item, idx) => {
          const k = `${nameKey || item.name || item.dataKey || "value"}`;
          const cfg = getPayloadConfig(config, item, k);
          const color = (item.payload?.fill as string) || item.color;

          return (
            <div
              key={`${k}-${idx}`}
              className="flex w-full items-center gap-2 leading-none"
            >
              {!hideIndicator && (
                <div
                  className={cn("rounded-sm", {
                    "h-2.5 w-2.5": indicator === "dot",
                    "h-2 w-1": indicator === "line",
                    "h-2 w-0 border border-dashed": indicator === "dashed",
                  })}
                  style={{ backgroundColor: color }}
                />
              )}

              <div className="flex flex-1 justify-between">
                <span className="text-muted-foreground">
                  {cfg?.label || item.name}
                </span>

                {item.value !== undefined && (
                  <span className="text-foreground font-mono font-medium">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Legend Component                              */
/* -------------------------------------------------------------------------- */

export function ChartLegend(
  props: LegendProps & { className?: string; nameKey?: string }
) {
  return <RechartsLegend {...props} content={<ChartLegendContent {...props} />} />;
}

export function ChartLegendContent({
  className,
  payload,
  hideIcon = false,
  nameKey,
  verticalAlign = "bottom",
}: {
  className?: string;
  payload?: LegendProps["payload"];
  hideIcon?: boolean;
  nameKey?: string;
  verticalAlign?: LegendProps["verticalAlign"];
}) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item, index) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const cfg = getPayloadConfig(config, item, key);

        return (
          <div key={index} className="flex items-center gap-1.5">
            {!hideIcon && (
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{cfg?.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getPayloadConfig(
  config: ChartConfig,
  item: any,
  key: string
) {
  const valueFromPayload =
    item?.payload?.[key] && typeof item.payload[key] === "string"
      ? item.payload[key]
      : undefined;

  const finalKey = valueFromPayload || key;

  return config[finalKey] || config[key];
}

export { ResponsiveContainer };
