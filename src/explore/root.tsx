import React from 'react';
import { Composition } from 'remotion';
import { TypeScan, TYPESCAN_DURATION } from './TypeScan';
import { RisingBar, RISINGBAR_DURATION } from './RisingBar';
import { RealProof, REALPROOF_DURATION } from './RealProof';
import { Bottleneck, BOTTLENECK_DURATION } from './Bottleneck';
import { MereExposure, MEREEXPOSURE_DURATION } from './MereExposure';
import { PeakEnd, PEAKEND_DURATION } from './PeakEnd';
import { LossFrame, LOSSFRAME_DURATION } from './LossFrame';
import { ZeroPrice, ZEROPRICE_DURATION } from './ZeroPrice';
import { Anchor, ANCHOR_DURATION } from './Anchor';
import { Decoy, DECOY_DURATION } from './Decoy';
import { OpenLoop, OPENLOOP_DURATION } from './OpenLoop';
import { ForgetCurve, FORGETCURVE_DURATION } from './ForgetCurve';
import { FirstImpression, FIRSTIMPRESSION_DURATION } from './FirstImpression';
import { SocialProofSpecific, SOCIALPROOFSPECIFIC_DURATION } from './SocialProofSpecific';
import { RecallTest, RECALLTEST_DURATION } from './RecallTest';
import { PriceFlip, PRICEFLIP_DURATION } from './PriceFlip';
import { Overload, OVERLOAD_DURATION } from './Overload';
import { Autopilot, AUTOPILOT_DURATION } from './Autopilot';
import { FreedomManifesto, FREEDOMMANIFESTO_DURATION } from './FreedomManifesto';
import { FreedomManifestoV2, FREEDOMMANIFESTOV2_DURATION } from './FreedomManifestoV2';
import { FreedomManifestoV3, FREEDOMMANIFESTOV3_DURATION } from './FreedomManifestoV3';

/**
 * Root SEPARADO para exploraciones — entry propio, NO toca src/Root.tsx (evita
 * colisión con otra sesión que trabaja en src/apple/). Render:
 *   npx remotion render src/explore/index.ts <id> out/<id>.mp4
 */
export const ExploreRoot: React.FC = () => (
  <>
    <Composition id="TypeScan" component={TypeScan} durationInFrames={TYPESCAN_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="RisingBar" component={RisingBar} durationInFrames={RISINGBAR_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="RealProof" component={RealProof} durationInFrames={REALPROOF_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="Bottleneck" component={Bottleneck} durationInFrames={BOTTLENECK_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="MereExposure" component={MereExposure} durationInFrames={MEREEXPOSURE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="PeakEnd" component={PeakEnd} durationInFrames={PEAKEND_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="LossFrame" component={LossFrame} durationInFrames={LOSSFRAME_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="ZeroPrice" component={ZeroPrice} durationInFrames={ZEROPRICE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="Anchor" component={Anchor} durationInFrames={ANCHOR_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="Decoy" component={Decoy} durationInFrames={DECOY_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="OpenLoop" component={OpenLoop} durationInFrames={OPENLOOP_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="ForgetCurve" component={ForgetCurve} durationInFrames={FORGETCURVE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="FirstImpression" component={FirstImpression} durationInFrames={FIRSTIMPRESSION_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="SocialProofSpecific" component={SocialProofSpecific} durationInFrames={SOCIALPROOFSPECIFIC_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="RecallTest" component={RecallTest} durationInFrames={RECALLTEST_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="PriceFlip" component={PriceFlip} durationInFrames={PRICEFLIP_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="Overload" component={Overload} durationInFrames={OVERLOAD_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="Autopilot" component={Autopilot} durationInFrames={AUTOPILOT_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="FreedomManifesto" component={FreedomManifesto} durationInFrames={FREEDOMMANIFESTO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="FreedomManifestoV2" component={FreedomManifestoV2} durationInFrames={FREEDOMMANIFESTOV2_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    <Composition id="FreedomManifestoV3" component={FreedomManifestoV3} durationInFrames={FREEDOMMANIFESTOV3_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
  </>
);
