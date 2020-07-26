/**
 * List of supported Elite Dangerous events
 */

import {
  StarPos,
  StarType,
  Allegiance,
  Economy,
  Government,
  SystemSecurity,
  BodyType,
  PowerType,
  PowerplayState,
  Faction,
  SystemFaction,
} from './definitions';

export interface EdEvent {
  timestamp: Date; // transformed to date when parsed
  event: string;
}

export interface EdNavRouteEvent extends EdEvent {
  Route: Array<{
    StarSystem: string;
    SystemAddress: number;
    StarPos: StarPos;
    StarClass: StarType;
  }>;
}

export interface EdFSDJumpEvent extends EdEvent {
  StarSystem: string;
  SystemAddress: number;
  StarPos: StarPos;
  SystemAllegiance: Allegiance;
  SystemEconomy: Economy;
  SystemEconomy_Localised: string;
  SystemSecondEconomy: Economy;
  SystemSecondEconomy_Localised: string;
  SystemGovernment: Government;
  SystemGovernment_Localised: string;
  SystemSecurity: SystemSecurity;
  SystemSecurity_Localised: string;
  Population: number;
  Body: string;
  BodyID: number;
  BodyType: BodyType;
  Powers: PowerType[];
  PowerplayState: PowerplayState;
  JumpDist: number;
  FuelUsed: number;
  FuelLevel: number;
  Factions: Faction[];
  SystemFaction: SystemFaction;
}
