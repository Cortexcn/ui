/*
 * The public stand-in for @cortexcn/icons. The main source draws these icons
 * with Central Icons, a paid icon set that can't be redistributed. Here each
 * name maps to the closest Lucide icon (MIT), and GitHub and X use their own
 * marks from Simple Icons (CC0). The props match, so the site's code is the
 * same in both.
 */
import {
  AppWindow,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Blocks,
  Book,
  Bot,
  BriefcaseBusiness,
  ChartLine,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Clipboard,
  Clock,
  CloudDownload,
  Code,
  CodeXml,
  Database,
  DollarSign,
  Eye,
  FileDown,
  FileText,
  Folder,
  Gem,
  Globe,
  GraduationCap,
  Heart,
  Images,
  Info,
  Layers,
  LayoutDashboard,
  ListOrdered,
  LoaderCircle,
  Lock,
  type LucideProps,
  Mailbox,
  Minus,
  Monitor,
  Moon,
  Palette,
  PanelsTopLeft,
  Play,
  Plus,
  RotateCw,
  Search,
  Server,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquareKanban,
  Sun,
  SwatchBook,
  Terminal,
  WandSparkles,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { ComponentType } from "react";

/** A brand mark drawn as a filled path, sized like a Lucide icon. */
function brandMark(path: string, displayName: string) {
  function Mark({
    size = 24,
    strokeWidth: _strokeWidth,
    absoluteStrokeWidth: _absoluteStrokeWidth,
    ...props
  }: LucideProps) {
    return (
      <svg
        aria-hidden="true"
        fill="currentColor"
        height={size}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d={path} />
      </svg>
    );
  }
  Mark.displayName = displayName;
  return Mark;
}

const GithubMark = brandMark(
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  "GithubMark",
);

const XMark = brandMark(
  "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  "XMark",
);

const ICONS = {
  IconAgent: Bot,
  IconArrowDown: ArrowDown,
  IconArrowLeft: ArrowLeft,
  IconArrowRight: ArrowRight,
  IconArrowRotateClockwise: RotateCw,
  IconArrowUp: ArrowUp,
  IconArrowUpRight: ArrowUpRight,
  IconBlocks: Blocks,
  IconBook: Book,
  IconCheckmark1: Check,
  IconCheckmark2: CheckCheck,
  IconChevronDownSmall: ChevronDown,
  IconChevronGrabberVertical: ChevronsUpDown,
  IconChevronLeft: ChevronLeft,
  IconChevronRight: ChevronRight,
  IconCircleInfo: Info,
  IconClipboard2: Clipboard,
  IconClock: Clock,
  IconCloudDownload: CloudDownload,
  IconCode: Code,
  IconCodeLines: CodeXml,
  IconColorPalette: Palette,
  IconColorSwatch: SwatchBook,
  IconConsole: Terminal,
  IconCrossSmall: X,
  IconDiamondShine: Gem,
  IconDollar: DollarSign,
  IconEyeOpen: Eye,
  IconFileDownload: FileDown,
  IconFileText: FileText,
  IconFolder1: Folder,
  IconGithub: GithubMark,
  IconGlobe: Globe,
  IconGraduateCap: GraduationCap,
  IconHeart: Heart,
  IconImac: Monitor,
  IconImages1: Images,
  IconKanbanView: SquareKanban,
  IconLayersTwo: Layers,
  IconLayoutDashboard: LayoutDashboard,
  IconLightning: Zap,
  IconLineChart1: ChartLine,
  IconLoadingCircle: LoaderCircle,
  IconLock: Lock,
  IconMagicWand: WandSparkles,
  IconMagnifyingGlass: Search,
  IconMailbox: Mailbox,
  IconMinusSmall: Minus,
  IconMoon: Moon,
  IconNumberedList: ListOrdered,
  IconPhone: Smartphone,
  IconPlay: Play,
  IconPlusSmall: Plus,
  IconServer: Server,
  IconSettingsKnob: SlidersHorizontal,
  IconShoppingBag1: ShoppingBag,
  IconSparklesSoft: Sparkles,
  IconStorage: Database,
  IconSuitcaseWork: BriefcaseBusiness,
  IconSun: Sun,
  IconTwitter: XMark,
  IconWindow: AppWindow,
  IconWindowApp: PanelsTopLeft,
  IconZoomIn: ZoomIn,
  IconZoomOut: ZoomOut,
} satisfies Record<string, ComponentType<LucideProps>>;

export type IconName = keyof typeof ICONS;

/** Kept for API parity with the Central Icons version; Lucide ignores most. */
export const defaultIconStyle = {
  join: "round",
  fill: "outlined",
  radius: "0",
  stroke: "1.5",
} as const;

export type IconProps = Omit<LucideProps, "name" | "fill" | "stroke"> & {
  name: IconName;
  join?: string;
  fill?: string;
  radius?: string;
  stroke?: string;
};

function Icon({
  name,
  join: _join,
  fill: _fill,
  radius: _radius,
  stroke = defaultIconStyle.stroke,
  ...props
}: IconProps) {
  const Glyph = ICONS[name];
  return <Glyph strokeWidth={Number(stroke)} {...props} />;
}

export type IconComponentProps = IconProps;

export { Icon };
