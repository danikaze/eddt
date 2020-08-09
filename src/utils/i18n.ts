import * as i18n from 'i18n';
import { LOCALES_FOLDER } from '@src/constants';

import { TranslationData as BodiesApproachedData } from '@src/info-generators/bodies-approached';
import { TranslationData as BodiesLeftData } from '@src/info-generators/bodies-left';
import { TranslationData as BountyData } from '@src/info-generators/bounty';
import { TranslationData as FactionKillBondsData } from '@src/info-generators/faction-kill-bond';
import { TranslationData as DockingsDeniedData } from '@src/info-generators/dockings-denied';
import { TranslationData as DockingsGrantedData } from '@src/info-generators/dockings-granted';
import { TranslationData as DockingsRequestedData } from '@src/info-generators/dockings-requested';
import { TranslationData as HeatWarningData } from '@src/info-generators/heat-warning';
import { TranslationData as InterdictionsEscapedData } from '@src/info-generators/interdiction-escaped';
import { TranslationData as InterdictionsLostData } from '@src/info-generators/interdiction-lost';
import { TranslationData as InterdictionsSubmittedData } from '@src/info-generators/interdiction-submitted';
import { TranslationData as JumpDistanceData } from '@src/info-generators/jump-distance';
import { TranslationData as LaunchedDronesData } from '@src/info-generators/launched-drones';
import { TranslationData as MaterialCollectedData } from '@src/info-generators/material-collected';
import { TranslationData as MiningRefinedData } from '@src/info-generators/mining-refined';
import { TranslationData as MissionsAbandonedData } from '@src/info-generators/missions-abandoned';
import { TranslationData as MissionsAcceptedData } from '@src/info-generators/missions-accepted';
import { TranslationData as MissionsCompletedData } from '@src/info-generators/missions-completed';
import { TranslationData as MissionsFailedData } from '@src/info-generators/missions-failed';
import { TranslationData as ProspectedAsteroidsData } from '@src/info-generators/prospected-asteroids';
import { TranslationData as ScannedData } from '@src/info-generators/scanned';
import { TranslationData as DetailedScanData } from '@src/info-generators/scan-detailed';
import { TranslationData as CargoScanData } from '@src/info-generators/scan-cargo';
import { TranslationData as SoldExplorationDataData } from '@src/info-generators/exploration-data-sold';

export interface TranslationData {
  bodiesApproached: BodiesApproachedData;
  bodiesLeft: BodiesLeftData;
  bounty: BountyData;
  factionKillBonds: FactionKillBondsData;
  dockingsDenied: DockingsDeniedData;
  dockingsGranted: DockingsGrantedData;
  dockingsRequested: DockingsRequestedData;
  heatWarning: HeatWarningData;
  interdictionsEscaped: InterdictionsEscapedData;
  interdictionsLost: InterdictionsLostData;
  interdictionsSubmitted: InterdictionsSubmittedData;
  jumpDistance: JumpDistanceData;
  launchedDrones: LaunchedDronesData;
  materialCollected: MaterialCollectedData;
  miningRefined: MiningRefinedData;
  missionsAbandoned: MissionsAbandonedData;
  missionsAccepted: MissionsAcceptedData;
  missionsCompleted: MissionsCompletedData;
  missionsFailed: MissionsFailedData;
  prospectedAsteroids: ProspectedAsteroidsData;
  scanned: ScannedData;
  detailedScan: DetailedScanData;
  cargoScan: CargoScanData;
  soldExplorationData: SoldExplorationDataData;
}

i18n.configure({
  defaultLocale: 'en',
  directory: LOCALES_FOLDER,
  autoReload: true,
});

export function setLocale(lang: string): void {
  i18n.setLocale(lang);
}

export function t<K extends keyof TranslationData>(
  key: K,
  data?: TranslationData[K]
): string | string[] | undefined {
  const catalog = i18n.getCatalog(i18n.getLocale());
  const text: string[] = [];
  let i = 1;
  let ki = `${key}${i}`;

  while (catalog[ki]) {
    const txt = i18n.__mf(`${key}${i}`, data);
    if (txt) {
      text.push(txt);
    }
    ki = `${key}${++i}`;
  }

  if (text.length === 0) {
    return catalog[key]
      ? i18n.__mf(key, (data as unknown) as i18n.Replacements)
      : undefined;
  }
  return text.length === 1 ? text[0] : text;
}

export function isDefined<K extends keyof TranslationData>(
  key: K,
  locale?: string
): boolean {
  return i18n.getCatalog(locale || i18n.getLocale())[key] !== undefined;
}
