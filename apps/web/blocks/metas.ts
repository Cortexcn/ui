import { aiChainOfThought01Meta } from "./ai-chain-of-thought-01/meta";
import { aiIntegrationBeam01Meta } from "./ai-integration-beam-01/meta";
import { aiIntegrationEvents01Meta } from "./ai-integration-events-01/meta";
import { aiIntegrationOrbit01Meta } from "./ai-integration-orbit-01/meta";
import { aiIntegrationPipeline01Meta } from "./ai-integration-pipeline-01/meta";
import { aiIntegrationSection01Meta } from "./ai-integration-section-01/meta";
import { aiIntegrationSyncStatus01Meta } from "./ai-integration-sync-status-01/meta";
import { aiQueue01Meta } from "./ai-queue-01/meta";
import { aiReasoning01Meta } from "./ai-reasoning-01/meta";
import { aiShimmer01Meta } from "./ai-shimmer-01/meta";
import { aiToolRouter01Meta } from "./ai-tool-router-01/meta";
import { bentoGridInsights01Meta } from "./bento-grid-insights-01/meta";
import { blogMasonry01Meta } from "./blog-masonry-01/meta";
import { chartGroupBusiness01Meta } from "./chart-group-business-01/meta";
import { chartGroupEcommerce01Meta } from "./chart-group-ecommerce-01/meta";
import { chartGroupEnergy01Meta } from "./chart-group-energy-01/meta";
import { chartGroupFinance01Meta } from "./chart-group-finance-01/meta";
import { chartGroupFitness01Meta } from "./chart-group-fitness-01/meta";
import { chartGroupHiring01Meta } from "./chart-group-hiring-01/meta";
import { chartGroupLogistics01Meta } from "./chart-group-logistics-01/meta";
import { chartGroupMarketing01Meta } from "./chart-group-marketing-01/meta";
import { chartGroupMarkets01Meta } from "./chart-group-markets-01/meta";
import { chartGroupProduct01Meta } from "./chart-group-product-01/meta";
import { chartGroupSaas01Meta } from "./chart-group-saas-01/meta";
import { chartGroupSales01Meta } from "./chart-group-sales-01/meta";
import { chartGroupSocial01Meta } from "./chart-group-social-01/meta";
import { chartGroupSupport01Meta } from "./chart-group-support-01/meta";
import { chartGroupTraffic01Meta } from "./chart-group-traffic-01/meta";
import { dashboardHarbor01Meta } from "./dashboard-harbor-01/meta";
import { dashboardLedger01Meta } from "./dashboard-ledger-01/meta";
import { dashboardMuster01Meta } from "./dashboard-muster-01/meta";
import { dashboardPatron01Meta } from "./dashboard-patron-01/meta";
import { dashboardTreasury01Meta } from "./dashboard-treasury-01/meta";
import { featureBentoGrid01Meta } from "./feature-bento-grid-01/meta";
import { featureMixedBento01Meta } from "./feature-mixed-bento-01/meta";
import { featureMockupGrid01Meta } from "./feature-mockup-grid-01/meta";
import { featureSpotlightGrid01Meta } from "./feature-spotlight-grid-01/meta";
import { featureStudioGrid01Meta } from "./feature-studio-grid-01/meta";
import { featureWalkthrough01Meta } from "./feature-walkthrough-01/meta";
import { galleryFlutedGlass01Meta } from "./gallery-fluted-glass-01/meta";
import { galleryLiquidSeams01Meta } from "./gallery-liquid-seams-01/meta";
import { galleryPrintPile01Meta } from "./gallery-print-pile-01/meta";
import { heroCover01Meta } from "./hero-cover-01/meta";
import { heroDashboard01Meta } from "./hero-dashboard-01/meta";
import { heroStudio01Meta } from "./hero-studio-01/meta";
import { heroSynapse01Meta } from "./hero-synapse-01/meta";
import { heroTiltedWall01Meta } from "./hero-tilted-wall-01/meta";
import { loaderDotMatrix01Meta } from "./loader-dot-matrix-01/meta";
import { loaderGlitchText01Meta } from "./loader-glitch-text-01/meta";
import type { BlockSlug } from "./manifest";
import { servicesImageGrid01Meta } from "./services-image-grid-01/meta";
import { servicesPreviewList01Meta } from "./services-preview-list-01/meta";
import { statCardArea01Meta } from "./stat-card-area-01/meta";
import { statCardChoropleth01Meta } from "./stat-card-choropleth-01/meta";
import { statCardLine01Meta } from "./stat-card-line-01/meta";

/** Name and description of every block, for the cards on /blocks. */
export const BLOCK_METAS: Record<
  BlockSlug,
  { name: string; description: string }
> = {
  "feature-spotlight-grid-01": featureSpotlightGrid01Meta,
  "feature-studio-grid-01": featureStudioGrid01Meta,
  "feature-bento-grid-01": featureBentoGrid01Meta,
  "feature-mixed-bento-01": featureMixedBento01Meta,
  "feature-mockup-grid-01": featureMockupGrid01Meta,
  "feature-walkthrough-01": featureWalkthrough01Meta,
  "stat-card-area-01": statCardArea01Meta,
  "stat-card-line-01": statCardLine01Meta,
  "stat-card-choropleth-01": statCardChoropleth01Meta,
  "ai-reasoning-01": aiReasoning01Meta,
  "ai-chain-of-thought-01": aiChainOfThought01Meta,
  "ai-shimmer-01": aiShimmer01Meta,
  "ai-queue-01": aiQueue01Meta,
  "hero-dashboard-01": heroDashboard01Meta,
  "hero-studio-01": heroStudio01Meta,
  "hero-cover-01": heroCover01Meta,
  "hero-synapse-01": heroSynapse01Meta,
  "dashboard-harbor-01": dashboardHarbor01Meta,
  "chart-group-business-01": chartGroupBusiness01Meta,
  "chart-group-saas-01": chartGroupSaas01Meta,
  "chart-group-marketing-01": chartGroupMarketing01Meta,
  "chart-group-ecommerce-01": chartGroupEcommerce01Meta,
  "chart-group-traffic-01": chartGroupTraffic01Meta,
  "chart-group-finance-01": chartGroupFinance01Meta,
  "chart-group-product-01": chartGroupProduct01Meta,
  "chart-group-support-01": chartGroupSupport01Meta,
  "chart-group-sales-01": chartGroupSales01Meta,
  "chart-group-social-01": chartGroupSocial01Meta,
  "chart-group-hiring-01": chartGroupHiring01Meta,
  "chart-group-logistics-01": chartGroupLogistics01Meta,
  "chart-group-energy-01": chartGroupEnergy01Meta,
  "chart-group-markets-01": chartGroupMarkets01Meta,
  "chart-group-fitness-01": chartGroupFitness01Meta,
  "dashboard-ledger-01": dashboardLedger01Meta,
  "dashboard-treasury-01": dashboardTreasury01Meta,
  "dashboard-patron-01": dashboardPatron01Meta,
  "dashboard-muster-01": dashboardMuster01Meta,
  "bento-grid-insights-01": bentoGridInsights01Meta,
  "loader-dot-matrix-01": loaderDotMatrix01Meta,
  "loader-glitch-text-01": loaderGlitchText01Meta,
  "services-image-grid-01": servicesImageGrid01Meta,
  "gallery-fluted-glass-01": galleryFlutedGlass01Meta,
  "gallery-liquid-seams-01": galleryLiquidSeams01Meta,
  "gallery-print-pile-01": galleryPrintPile01Meta,
  "blog-masonry-01": blogMasonry01Meta,
  "hero-tilted-wall-01": heroTiltedWall01Meta,
  "services-preview-list-01": servicesPreviewList01Meta,
  "ai-tool-router-01": aiToolRouter01Meta,
  "ai-integration-beam-01": aiIntegrationBeam01Meta,
  "ai-integration-section-01": aiIntegrationSection01Meta,
  "ai-integration-orbit-01": aiIntegrationOrbit01Meta,
  "ai-integration-pipeline-01": aiIntegrationPipeline01Meta,
  "ai-integration-events-01": aiIntegrationEvents01Meta,
  "ai-integration-sync-status-01": aiIntegrationSyncStatus01Meta,
};
