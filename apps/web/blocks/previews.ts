import type { ComponentType } from "react";
import { AiChainOfThoughtPreview } from "./ai-chain-of-thought-01/preview";
import { IntegrationBeamPreview } from "./ai-integration-beam-01/preview";
import { IntegrationEventsPreview } from "./ai-integration-events-01/preview";
import { IntegrationOrbitPreview } from "./ai-integration-orbit-01/preview";
import { IntegrationPipelinePreview } from "./ai-integration-pipeline-01/preview";
import { IntegrationSectionPreview } from "./ai-integration-section-01/preview";
import { IntegrationSyncStatusPreview } from "./ai-integration-sync-status-01/preview";
import { AiQueuePreview } from "./ai-queue-01/preview";
import { AiReasoningPreview } from "./ai-reasoning-01/preview";
import { AiShimmerPreview } from "./ai-shimmer-01/preview";
import { AiToolRouterPreview } from "./ai-tool-router-01/preview";
import { BentoGridInsightsPreview } from "./bento-grid-insights-01/preview";
import { BlogMasonryPreview } from "./blog-masonry-01/preview";
import { ChartGroupBusinessPreview } from "./chart-group-business-01/preview";
import { ChartGroupEcommercePreview } from "./chart-group-ecommerce-01/preview";
import { ChartGroupEnergyPreview } from "./chart-group-energy-01/preview";
import { ChartGroupFinancePreview } from "./chart-group-finance-01/preview";
import { ChartGroupFitnessPreview } from "./chart-group-fitness-01/preview";
import { ChartGroupHiringPreview } from "./chart-group-hiring-01/preview";
import { ChartGroupLogisticsPreview } from "./chart-group-logistics-01/preview";
import { ChartGroupMarketingPreview } from "./chart-group-marketing-01/preview";
import { ChartGroupMarketsPreview } from "./chart-group-markets-01/preview";
import { ChartGroupProductPreview } from "./chart-group-product-01/preview";
import { ChartGroupSaasPreview } from "./chart-group-saas-01/preview";
import { ChartGroupSalesPreview } from "./chart-group-sales-01/preview";
import { ChartGroupSocialPreview } from "./chart-group-social-01/preview";
import { ChartGroupSupportPreview } from "./chart-group-support-01/preview";
import { ChartGroupTrafficPreview } from "./chart-group-traffic-01/preview";
import { DashboardHarborPreview } from "./dashboard-harbor-01/preview";
import { DashboardLedgerPreview } from "./dashboard-ledger-01/preview";
import { DashboardMusterPreview } from "./dashboard-muster-01/preview";
import { DashboardPatronPreview } from "./dashboard-patron-01/preview";
import { DashboardTreasuryPreview } from "./dashboard-treasury-01/preview";
import { FeatureBentoGridPreview } from "./feature-bento-grid-01/preview";
import { FeatureMixedBentoPreview } from "./feature-mixed-bento-01/preview";
import { FeatureMockupGridPreview } from "./feature-mockup-grid-01/preview";
import { FeatureSpotlightGridPreview } from "./feature-spotlight-grid-01/preview";
import { FeatureStudioGridPreview } from "./feature-studio-grid-01/preview";
import { FeatureWalkthroughPreview } from "./feature-walkthrough-01/preview";
import { GalleryFlutedGlassPreview } from "./gallery-fluted-glass-01/preview";
import { GalleryLiquidSeamsPreview } from "./gallery-liquid-seams-01/preview";
import { GalleryPrintPilePreview } from "./gallery-print-pile-01/preview";
import { HeroCoverPreview } from "./hero-cover-01/preview";
import { HeroDashboardPreview } from "./hero-dashboard-01/preview";
import { HeroStudioPreview } from "./hero-studio-01/preview";
import { HeroSynapsePreview } from "./hero-synapse-01/preview";
import { HeroTiltedWallPreview } from "./hero-tilted-wall-01/preview";
import { LoaderDotMatrixPreview } from "./loader-dot-matrix-01/preview";
import { LoaderGlitchTextPreview } from "./loader-glitch-text-01/preview";
import type { BlockSlug } from "./manifest";
import { ServicesImageGridPreview } from "./services-image-grid-01/preview";
import { ServicesPreviewListPreview } from "./services-preview-list-01/preview";
import { StatCardAreaPreview } from "./stat-card-area-01/preview";
import { StatCardChoroplethPreview } from "./stat-card-choropleth-01/preview";
import { StatCardLinePreview } from "./stat-card-line-01/preview";

/** Live previews, reused for the card thumbnails on /blocks. */
export const BLOCK_PREVIEWS: Record<BlockSlug, ComponentType> = {
  "feature-spotlight-grid-01": FeatureSpotlightGridPreview,
  "feature-studio-grid-01": FeatureStudioGridPreview,
  "feature-bento-grid-01": FeatureBentoGridPreview,
  "feature-mixed-bento-01": FeatureMixedBentoPreview,
  "feature-mockup-grid-01": FeatureMockupGridPreview,
  "feature-walkthrough-01": FeatureWalkthroughPreview,
  "stat-card-area-01": StatCardAreaPreview,
  "stat-card-line-01": StatCardLinePreview,
  "stat-card-choropleth-01": StatCardChoroplethPreview,
  "ai-reasoning-01": AiReasoningPreview,
  "ai-chain-of-thought-01": AiChainOfThoughtPreview,
  "ai-shimmer-01": AiShimmerPreview,
  "ai-queue-01": AiQueuePreview,
  "hero-dashboard-01": HeroDashboardPreview,
  "hero-studio-01": HeroStudioPreview,
  "hero-cover-01": HeroCoverPreview,
  "hero-synapse-01": HeroSynapsePreview,
  "dashboard-harbor-01": DashboardHarborPreview,
  "chart-group-business-01": ChartGroupBusinessPreview,
  "chart-group-saas-01": ChartGroupSaasPreview,
  "chart-group-marketing-01": ChartGroupMarketingPreview,
  "chart-group-ecommerce-01": ChartGroupEcommercePreview,
  "chart-group-traffic-01": ChartGroupTrafficPreview,
  "chart-group-finance-01": ChartGroupFinancePreview,
  "chart-group-product-01": ChartGroupProductPreview,
  "chart-group-support-01": ChartGroupSupportPreview,
  "chart-group-sales-01": ChartGroupSalesPreview,
  "chart-group-social-01": ChartGroupSocialPreview,
  "chart-group-hiring-01": ChartGroupHiringPreview,
  "chart-group-logistics-01": ChartGroupLogisticsPreview,
  "chart-group-energy-01": ChartGroupEnergyPreview,
  "chart-group-markets-01": ChartGroupMarketsPreview,
  "chart-group-fitness-01": ChartGroupFitnessPreview,
  "dashboard-ledger-01": DashboardLedgerPreview,
  "dashboard-treasury-01": DashboardTreasuryPreview,
  "dashboard-patron-01": DashboardPatronPreview,
  "dashboard-muster-01": DashboardMusterPreview,
  "bento-grid-insights-01": BentoGridInsightsPreview,
  "loader-dot-matrix-01": LoaderDotMatrixPreview,
  "loader-glitch-text-01": LoaderGlitchTextPreview,
  "services-image-grid-01": ServicesImageGridPreview,
  "gallery-fluted-glass-01": GalleryFlutedGlassPreview,
  "gallery-liquid-seams-01": GalleryLiquidSeamsPreview,
  "gallery-print-pile-01": GalleryPrintPilePreview,
  "blog-masonry-01": BlogMasonryPreview,
  "hero-tilted-wall-01": HeroTiltedWallPreview,
  "services-preview-list-01": ServicesPreviewListPreview,
  "ai-tool-router-01": AiToolRouterPreview,
  "ai-integration-beam-01": IntegrationBeamPreview,
  "ai-integration-section-01": IntegrationSectionPreview,
  "ai-integration-orbit-01": IntegrationOrbitPreview,
  "ai-integration-pipeline-01": IntegrationPipelinePreview,
  "ai-integration-events-01": IntegrationEventsPreview,
  "ai-integration-sync-status-01": IntegrationSyncStatusPreview,
};
