"use client";

import { AvatarGroupWithCount } from "@cortexcn/ui/examples/avatar";
import { BadgeVariants } from "@cortexcn/ui/examples/badge";
import { ButtonGroupPagination } from "@cortexcn/ui/examples/button-group";
import { CalendarInCard } from "@cortexcn/ui/examples/calendar";
import { CommandInline } from "@cortexcn/ui/examples/command";
import { EmptyInCard } from "@cortexcn/ui/examples/empty";
import { InputOTPSimple } from "@cortexcn/ui/examples/input-otp";
import { FileUploadList } from "@cortexcn/ui/examples/progress";
import { RadioGroupWithDescriptions } from "@cortexcn/ui/examples/radio-group";
import { SwitchWithDescription } from "@cortexcn/ui/examples/switch";
import { TableWithBadges } from "@cortexcn/ui/examples/table";
import { TabsWithContent } from "@cortexcn/ui/examples/tabs";
import { ToggleGroupFilter } from "@cortexcn/ui/examples/toggle-group";
import { AccordionBasic } from "@/components/docs/accordion-demo";
import { AreaChartPatternDemo } from "@/components/docs/area-chart-pattern-demo";
import {
  BarChartGradientDemo,
  BarChartHorizontalDemo,
  BarChartStackedDemo,
} from "@/components/docs/bar-chart-demo";
import { CandlestickChartDemo } from "@/components/docs/candlestick-chart-demo";
import { ChoroplethDemo } from "@/components/docs/choropleth-demo";
import { CommandSearchDemo } from "@/components/docs/command-search-demo";
import { FanOutDiagramDemo } from "@/components/docs/fan-out-diagram-demo";
import { FaqTabsCardDemo } from "@/components/docs/faq-tabs-card-demo";
import { GaugeChartDemo } from "@/components/docs/gauge-chart-demo";
import { GooeyNavCompactDemo } from "@/components/docs/gooey-nav-demo";
import { LegendProgressDemo } from "@/components/docs/legend-demo";
import { LineChartDateRangeDemo } from "@/components/docs/line-chart-date-range-demo";
import { LineNavDemo } from "@/components/docs/line-nav-demo";
import { LiveLineChartDemo } from "@/components/docs/live-line-chart-demo";
import { LogosCarouselDemo } from "@/components/docs/logos-carousel-demo";
import { MarqueeDemo } from "@/components/docs/marquee-demo";
import { NumberTickerDemo } from "@/components/docs/number-ticker-demo";
import { PieChartDonutDemo } from "@/components/docs/pie-chart-demo";
import { ProfitLossLineDemo } from "@/components/docs/profit-loss-line-demo";
import { RadarChartBasicDemo } from "@/components/docs/radar-chart-demo";
import { RingChartBasicDemo } from "@/components/docs/ring-chart-demo";
import { SankeyNoLabelsDemo } from "@/components/docs/sankey-pattern-demo";
import { ScatterChartDemo } from "@/components/docs/scatter-chart-demo";
import { SphereMenuDemo } from "@/components/docs/sphere-menu-demo";
import { SunburstChartDemo } from "@/components/docs/sunburst-chart-demo";
import { WorkExperienceDemo } from "@/components/docs/work-experience-demo";

import { type CanvasColumn, CardCanvas } from "./card-canvas";

/** Five staggered columns of live components, each from its docs demo. */
const COLUMNS: CanvasColumn[] = [
  {
    width: "w-[400px]",
    offset: "mt-0",
    cards: [
      {
        slug: "bar-chart",
        title: "Bar Chart",
        kind: "Chart",
        demo: <BarChartGradientDemo />,
      },
      {
        slug: "calendar",
        title: "Calendar",
        kind: "Component",
        demo: <CalendarInCard />,
      },
      {
        slug: "command-search",
        title: "Command Search",
        kind: "Cortex",
        demo: <CommandSearchDemo />,
      },
      {
        slug: "area-chart",
        title: "Area Chart",
        kind: "Chart",
        demo: <AreaChartPatternDemo />,
      },
      {
        slug: "table",
        title: "Table",
        kind: "Component",
        demo: <TableWithBadges />,
      },
      {
        slug: "accordion",
        title: "Accordion",
        kind: "Component",
        demo: <AccordionBasic />,
      },
      {
        slug: "choropleth-chart",
        title: "Choropleth Chart",
        kind: "Chart",
        demo: <ChoroplethDemo />,
      },
      {
        slug: "badge",
        title: "Badge",
        kind: "Component",
        demo: <BadgeVariants />,
      },
    ],
  },
  {
    width: "w-[340px]",
    offset: "mt-28",
    cards: [
      {
        slug: "number-ticker",
        title: "Number Ticker",
        kind: "Cortex",
        demo: <NumberTickerDemo />,
      },
      {
        slug: "input-otp",
        title: "Input OTP",
        kind: "Component",
        demo: <InputOTPSimple />,
      },
      {
        slug: "pie-chart",
        title: "Pie Chart",
        kind: "Chart",
        demo: <PieChartDonutDemo />,
      },
      {
        slug: "line-nav",
        title: "Line Nav",
        kind: "Cortex",
        demo: <LineNavDemo />,
      },
      {
        slug: "switch",
        title: "Switch",
        kind: "Component",
        demo: <SwitchWithDescription />,
      },
      {
        slug: "gauge-chart",
        title: "Gauge",
        kind: "Chart",
        demo: <GaugeChartDemo />,
      },
      {
        slug: "scatter-chart",
        title: "Scatter Chart",
        kind: "Chart",
        demo: <ScatterChartDemo />,
      },
      {
        slug: "avatar",
        title: "Avatar",
        kind: "Component",
        demo: <AvatarGroupWithCount />,
      },
    ],
  },
  {
    width: "w-[400px]",
    offset: "mt-12",
    cards: [
      {
        slug: "faq-tabs-card",
        title: "FAQ Tabs Card",
        kind: "Cortex",
        demo: <FaqTabsCardDemo />,
      },
      {
        slug: "bar-chart-stacked",
        title: "Stacked Bar Chart",
        kind: "Chart",
        demo: <BarChartStackedDemo />,
      },
      {
        slug: "candlestick-chart",
        title: "Candlestick Chart",
        kind: "Chart",
        demo: <CandlestickChartDemo />,
      },
      {
        slug: "progress",
        title: "Progress",
        kind: "Component",
        demo: <FileUploadList />,
      },
      {
        slug: "logos-carousel",
        title: "Logos Carousel",
        kind: "Cortex",
        demo: <LogosCarouselDemo />,
      },
      {
        slug: "radar-chart",
        title: "Radar Chart",
        kind: "Chart",
        demo: <RadarChartBasicDemo />,
      },
      {
        slug: "tabs",
        title: "Tabs",
        kind: "Component",
        demo: <TabsWithContent />,
      },
      {
        slug: "work-experience",
        title: "Work Experience",
        kind: "Cortex",
        demo: <WorkExperienceDemo />,
      },
    ],
  },
  {
    width: "w-[340px]",
    offset: "mt-40",
    cards: [
      {
        slug: "ring-chart",
        title: "Ring Chart",
        kind: "Chart",
        demo: <RingChartBasicDemo />,
      },
      {
        slug: "gooey-nav",
        title: "Gooey Nav",
        kind: "Cortex",
        demo: <GooeyNavCompactDemo />,
      },
      {
        slug: "toggle-group",
        title: "Toggle Group",
        kind: "Component",
        demo: <ToggleGroupFilter />,
      },
      {
        slug: "sankey-chart",
        title: "Sankey Chart",
        kind: "Chart",
        demo: <SankeyNoLabelsDemo />,
      },
      {
        slug: "radio-group",
        title: "Radio Group",
        kind: "Component",
        demo: <RadioGroupWithDescriptions />,
      },
      {
        slug: "live-line-chart",
        title: "Live Line Chart",
        kind: "Chart",
        demo: <LiveLineChartDemo />,
      },
      {
        slug: "legend",
        title: "Legend",
        kind: "Chart",
        demo: <LegendProgressDemo />,
      },
      {
        slug: "sunburst-chart",
        title: "Sunburst Chart",
        kind: "Chart",
        demo: <SunburstChartDemo />,
      },
      {
        slug: "marquee",
        title: "Marquee",
        kind: "Cortex",
        demo: <MarqueeDemo />,
      },
    ],
  },
  {
    width: "w-[400px]",
    offset: "mt-20",
    cards: [
      {
        slug: "profit-loss-line",
        title: "Profit/Loss Line",
        kind: "Chart",
        demo: <ProfitLossLineDemo />,
      },
      {
        slug: "fan-out-diagram",
        title: "Fan-Out Diagram",
        kind: "Cortex",
        demo: <FanOutDiagramDemo />,
      },
      {
        slug: "empty",
        title: "Empty",
        kind: "Component",
        demo: <EmptyInCard />,
      },
      {
        slug: "line-chart",
        title: "Line Chart",
        kind: "Chart",
        demo: <LineChartDateRangeDemo />,
      },
      {
        slug: "sphere-menu",
        title: "Sphere Menu",
        kind: "Cortex",
        demo: <SphereMenuDemo />,
      },
      {
        slug: "command",
        title: "Command",
        kind: "Component",
        demo: <CommandInline />,
      },
      {
        slug: "bar-chart-horizontal",
        title: "Horizontal Bar Chart",
        kind: "Chart",
        demo: <BarChartHorizontalDemo />,
      },
      {
        slug: "button-group",
        title: "Button Group",
        kind: "Component",
        demo: <ButtonGroupPagination />,
      },
    ],
  },
];

/**
 * The cards the camera visits, in order: a snake across the columns, left to
 * right along one row and back along the next, so every flight is a short
 * hop to a neighbor rather than a sweep across the whole wall.
 */
const TOUR = [
  "bar-chart",
  "number-ticker",
  "faq-tabs-card",
  "ring-chart",
  "profit-loss-line",
  "fan-out-diagram",
  "gooey-nav",
  "bar-chart-stacked",
  "input-otp",
  "calendar",
  "command-search",
  "pie-chart",
  "candlestick-chart",
  "toggle-group",
  "empty",
  "line-chart",
  "sankey-chart",
  "progress",
  "line-nav",
  "area-chart",
  "table",
  "switch",
  "logos-carousel",
  "radio-group",
  "sphere-menu",
  "command",
  "live-line-chart",
  "radar-chart",
  "gauge-chart",
  "accordion",
];

/**
 * The library home's hero canvas: a wall of live Cortexcn components beside
 * the hero text. `CardCanvas` moves the camera.
 */
export function HeroCanvas({ className }: { className?: string }) {
  return <CardCanvas className={className} columns={COLUMNS} tour={TOUR} />;
}
