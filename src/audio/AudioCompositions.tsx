/**
 * AudioCompositions — registra una variante "<Id>-A" de cada mecanismo aprobado,
 * idéntica en imagen pero con su banda de sonido (sfx.ts) montada por WithAudio.
 * Se incluye dentro del RemotionRoot. NO modifica ningún componente visual.
 */
import React from 'react';
import { Composition } from 'remotion';
import { WithAudio } from './WithAudio';

import { Conveyor, CONVEYOR_DURATION } from '../apple/Conveyor';
import { SilentChurn, SILENTCHURN_DURATION } from '../apple/SilentChurn';
import { GridBreak, GRIDBREAK_DURATION } from '../apple/GridBreak';
import { Materialize, MATERIALIZE_DURATION } from '../apple/Materialize';
import { TimeSlip, TIMESLIP_DURATION } from '../apple/TimeSlip';
import { MilCortes, MILCORTES_DURATION } from '../apple/MilCortes';

import { TypeScan, TYPESCAN_DURATION } from '../explore/TypeScan';
import { RisingBar, RISINGBAR_DURATION } from '../explore/RisingBar';
import { PeakEnd, PEAKEND_DURATION } from '../explore/PeakEnd';
import { LossFrame, LOSSFRAME_DURATION } from '../explore/LossFrame';
import { Anchor, ANCHOR_DURATION } from '../explore/Anchor';
import { OpenLoop, OPENLOOP_DURATION } from '../explore/OpenLoop';
import { RecallTest, RECALLTEST_DURATION } from '../explore/RecallTest';
import { PriceFlip, PRICEFLIP_DURATION } from '../explore/PriceFlip';
import { Autopilot, AUTOPILOT_DURATION } from '../explore/Autopilot';
import { Bottleneck, BOTTLENECK_DURATION } from '../explore/Bottleneck';
import { MereExposure, MEREEXPOSURE_DURATION } from '../explore/MereExposure';

const ITEMS: { id: string; comp: React.FC; dur: number }[] = [
  { id: 'Conveyor', comp: Conveyor, dur: CONVEYOR_DURATION },
  { id: 'SilentChurn', comp: SilentChurn, dur: SILENTCHURN_DURATION },
  { id: 'GridBreak', comp: GridBreak, dur: GRIDBREAK_DURATION },
  { id: 'Materialize', comp: Materialize, dur: MATERIALIZE_DURATION },
  { id: 'TimeSlip', comp: TimeSlip, dur: TIMESLIP_DURATION },
  { id: 'MilCortes', comp: MilCortes, dur: MILCORTES_DURATION },
  { id: 'TypeScan', comp: TypeScan, dur: TYPESCAN_DURATION },
  { id: 'RisingBar', comp: RisingBar, dur: RISINGBAR_DURATION },
  { id: 'PeakEnd', comp: PeakEnd, dur: PEAKEND_DURATION },
  { id: 'LossFrame', comp: LossFrame, dur: LOSSFRAME_DURATION },
  { id: 'Anchor', comp: Anchor, dur: ANCHOR_DURATION },
  { id: 'OpenLoop', comp: OpenLoop, dur: OPENLOOP_DURATION },
  { id: 'RecallTest', comp: RecallTest, dur: RECALLTEST_DURATION },
  { id: 'PriceFlip', comp: PriceFlip, dur: PRICEFLIP_DURATION },
  { id: 'Autopilot', comp: Autopilot, dur: AUTOPILOT_DURATION },
  { id: 'Bottleneck', comp: Bottleneck, dur: BOTTLENECK_DURATION },
  { id: 'MereExposure', comp: MereExposure, dur: MEREEXPOSURE_DURATION },
];

export const AudioCompositions: React.FC = () => (
  <>
    {ITEMS.map(({ id, comp: Comp, dur }) => {
      const WithSound: React.FC = () => (
        <WithAudio track={id}>
          <Comp />
        </WithAudio>
      );
      return (
        <Composition
          key={id}
          id={`${id}-A`}
          component={WithSound}
          durationInFrames={dur}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{}}
        />
      );
    })}
  </>
);
