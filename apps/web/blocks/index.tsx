import type { ComponentType } from "react";
import { readBlockFiles } from "@/lib/blocks/read-block-files";
import { isProItem } from "@/lib/pro";
import { AiChainOfThoughtBlock } from "./ai-chain-of-thought-01";
import { IntegrationBeamBlock } from "./ai-integration-beam-01";
import { IntegrationEventsBlock } from "./ai-integration-events-01";
import { IntegrationOrbitBlock } from "./ai-integration-orbit-01";
import { IntegrationPipelineBlock } from "./ai-integration-pipeline-01";
import { IntegrationSectionBlock } from "./ai-integration-section-01";
import { IntegrationSyncStatusBlock } from "./ai-integration-sync-status-01";
import { AiQueueBlock } from "./ai-queue-01";
import { AiReasoningBlock } from "./ai-reasoning-01";
import { AiShimmerBlock } from "./ai-shimmer-01";
import { AiToolRouterBlock } from "./ai-tool-router-01";
import { BentoGridInsightsBlock } from "./bento-grid-insights-01";
import { BlogMasonryBlock } from "./blog-masonry-01";
import type { BlockCategory } from "./categories";
import { ChartGroupBusinessBlock } from "./chart-group-business-01";
import { ChartGroupEcommerceBlock } from "./chart-group-ecommerce-01";
import { ChartGroupEnergyBlock } from "./chart-group-energy-01";
import { ChartGroupFinanceBlock } from "./chart-group-finance-01";
import { ChartGroupFitnessBlock } from "./chart-group-fitness-01";
import { ChartGroupHiringBlock } from "./chart-group-hiring-01";
import { ChartGroupLogisticsBlock } from "./chart-group-logistics-01";
import { ChartGroupMarketingBlock } from "./chart-group-marketing-01";
import { ChartGroupMarketsBlock } from "./chart-group-markets-01";
import { ChartGroupProductBlock } from "./chart-group-product-01";
import { ChartGroupSaasBlock } from "./chart-group-saas-01";
import { ChartGroupSalesBlock } from "./chart-group-sales-01";
import { ChartGroupSocialBlock } from "./chart-group-social-01";
import { ChartGroupSupportBlock } from "./chart-group-support-01";
import { ChartGroupTrafficBlock } from "./chart-group-traffic-01";
import { DashboardHarborBlock } from "./dashboard-harbor-01";
import { DashboardLedgerBlock } from "./dashboard-ledger-01";
import { DashboardMusterBlock } from "./dashboard-muster-01";
import { DashboardPatronBlock } from "./dashboard-patron-01";
import { DashboardTreasuryBlock } from "./dashboard-treasury-01";
import { FeatureBentoGridBlock } from "./feature-bento-grid-01";
import { FeatureMixedBentoBlock } from "./feature-mixed-bento-01";
import { FeatureMockupGridBlock } from "./feature-mockup-grid-01";
import { FeatureSpotlightGridBlock } from "./feature-spotlight-grid-01";
import { FeatureStudioGridBlock } from "./feature-studio-grid-01";
import { FeatureWalkthroughBlock } from "./feature-walkthrough-01";
import { GalleryFlutedGlassBlock } from "./gallery-fluted-glass-01";
import { GalleryLiquidSeamsBlock } from "./gallery-liquid-seams-01";
import { GalleryPrintPileBlock } from "./gallery-print-pile-01";
import { HeroCoverBlock } from "./hero-cover-01";
import { HeroDashboardBlock } from "./hero-dashboard-01";
import { HeroStudioBlock } from "./hero-studio-01";
import { HeroSynapseBlock } from "./hero-synapse-01";
import { HeroTapestryBlock } from "./hero-tapestry-01";
import { HeroTidelineBlock } from "./hero-tideline-01";
import { HeroTiltedWallBlock } from "./hero-tilted-wall-01";
import { LoaderDotMatrixBlock } from "./loader-dot-matrix-01";
import { LoaderGlitchTextBlock } from "./loader-glitch-text-01";
import { type BlockSlug, blockFileManifests } from "./manifest";
import { ServicesImageGridBlock } from "./services-image-grid-01";
import { ServicesPreviewListBlock } from "./services-preview-list-01";
import { StatCardAreaBlock } from "./stat-card-area-01";
import type { BlockDisplayProps } from "./stat-card-area-01/meta";
import { StatCardChoroplethBlock } from "./stat-card-choropleth-01";
import { StatCardLineBlock } from "./stat-card-line-01";

const BLOCK_VIEWERS: Record<BlockSlug, ComponentType<BlockDisplayProps>> = {
  "feature-spotlight-grid-01": FeatureSpotlightGridBlock,
  "feature-studio-grid-01": FeatureStudioGridBlock,
  "feature-bento-grid-01": FeatureBentoGridBlock,
  "feature-mixed-bento-01": FeatureMixedBentoBlock,
  "feature-mockup-grid-01": FeatureMockupGridBlock,
  "feature-walkthrough-01": FeatureWalkthroughBlock,
  "stat-card-area-01": StatCardAreaBlock,
  "stat-card-line-01": StatCardLineBlock,
  "stat-card-choropleth-01": StatCardChoroplethBlock,
  "ai-reasoning-01": AiReasoningBlock,
  "ai-chain-of-thought-01": AiChainOfThoughtBlock,
  "ai-shimmer-01": AiShimmerBlock,
  "ai-queue-01": AiQueueBlock,
  "hero-dashboard-01": HeroDashboardBlock,
  "hero-studio-01": HeroStudioBlock,
  "hero-cover-01": HeroCoverBlock,
  "hero-synapse-01": HeroSynapseBlock,
  "hero-tapestry-01": HeroTapestryBlock,
  "hero-tideline-01": HeroTidelineBlock,
  "dashboard-harbor-01": DashboardHarborBlock,
  "chart-group-business-01": ChartGroupBusinessBlock,
  "chart-group-saas-01": ChartGroupSaasBlock,
  "chart-group-marketing-01": ChartGroupMarketingBlock,
  "chart-group-ecommerce-01": ChartGroupEcommerceBlock,
  "chart-group-traffic-01": ChartGroupTrafficBlock,
  "chart-group-finance-01": ChartGroupFinanceBlock,
  "chart-group-product-01": ChartGroupProductBlock,
  "chart-group-support-01": ChartGroupSupportBlock,
  "chart-group-sales-01": ChartGroupSalesBlock,
  "chart-group-social-01": ChartGroupSocialBlock,
  "chart-group-hiring-01": ChartGroupHiringBlock,
  "chart-group-logistics-01": ChartGroupLogisticsBlock,
  "chart-group-energy-01": ChartGroupEnergyBlock,
  "chart-group-markets-01": ChartGroupMarketsBlock,
  "chart-group-fitness-01": ChartGroupFitnessBlock,
  "dashboard-ledger-01": DashboardLedgerBlock,
  "dashboard-treasury-01": DashboardTreasuryBlock,
  "dashboard-patron-01": DashboardPatronBlock,
  "dashboard-muster-01": DashboardMusterBlock,
  "bento-grid-insights-01": BentoGridInsightsBlock,
  "loader-dot-matrix-01": LoaderDotMatrixBlock,
  "loader-glitch-text-01": LoaderGlitchTextBlock,
  "services-image-grid-01": ServicesImageGridBlock,
  "gallery-fluted-glass-01": GalleryFlutedGlassBlock,
  "gallery-liquid-seams-01": GalleryLiquidSeamsBlock,
  "gallery-print-pile-01": GalleryPrintPileBlock,
  "blog-masonry-01": BlogMasonryBlock,
  "hero-tilted-wall-01": HeroTiltedWallBlock,
  "services-preview-list-01": ServicesPreviewListBlock,
  "ai-tool-router-01": AiToolRouterBlock,
  "ai-integration-beam-01": IntegrationBeamBlock,
  "ai-integration-section-01": IntegrationSectionBlock,
  "ai-integration-orbit-01": IntegrationOrbitBlock,
  "ai-integration-pipeline-01": IntegrationPipelineBlock,
  "ai-integration-events-01": IntegrationEventsBlock,
  "ai-integration-sync-status-01": IntegrationSyncStatusBlock,
};

/** A block's source files, or none for a Pro block, so its code stays out of the page. */
function blockFiles(slug: BlockSlug) {
  return isProItem(slug) ? [] : readBlockFiles(slug, blockFileManifests[slug]);
}

/** The viewer (preview, code, install) for one block. */
export function getBlockElement(slug: BlockSlug) {
  const Viewer = BLOCK_VIEWERS[slug];
  return <Viewer embedded files={blockFiles(slug)} key={slug} />;
}

/** Block viewers (preview, code, install) for every block in a category. */
export function getCategoryBlockElements(category: BlockCategory) {
  return category.blocks.map((slug) => {
    const Viewer = BLOCK_VIEWERS[slug];
    return <Viewer embedded files={blockFiles(slug)} key={slug} />;
  });
}
