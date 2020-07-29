/**
 * List of supported Elite Dangerous events
 */

import {
  StarPos,
  StarType,
  AllegianceType,
  EconomyType,
  GovernmentType,
  SystemSecurity,
  BodyType,
  PowerType,
  PowerplayState,
  Faction,
  SystemFaction,
  StationType,
  StationService,
  StationEconomy,
} from './definitions';

export interface EdEvent<E extends string = string> {
  timestamp: Date; // transformed to date when parsed
  event: E;
}

export interface EdNavRouteEvent extends EdEvent<'NavRoute'> {
  Route: Array<{
    StarSystem: string;
    SystemAddress: number;
    StarPos: StarPos;
    StarClass: StarType;
  }>;
}

export interface EdFSDJumpEvent extends EdEvent<'FSDJump'> {
  StarSystem: string;
  SystemAddress: number;
  StarPos: StarPos;
  SystemAllegiance: AllegianceType;
  SystemEconomy: EconomyType;
  SystemEconomy_Localised: string;
  SystemSecondEconomy: EconomyType;
  SystemSecondEconomy_Localised: string;
  SystemGovernment: GovernmentType;
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

export interface EdDockedEvent extends EdEvent<'Docked'> {
  StationName: string;
  StationType: StationType;
  StarSystem: string;
  SystemAddress: number;
  MarketID: number;
  StationFaction: Partial<Faction>;
  StationGovernment: GovernmentType;
  StationGovernment_Localised: string;
  StationAllegiance: AllegianceType;
  StationServices: StationService[];
  StationEconomy: EconomyType;
  StationEconomy_Localised: string;
  StationEconomies: StationEconomy[];
  DistFromStarLS: number;
}

export interface EdUnDockedEvent extends EdEvent<'Undocked'> {
  StationName: string;
  StationType: StationType;
  MarketID: number;
}

export interface EdApproachBody extends EdEvent<'ApproachBody'> {
  StarSystem: string;
  SystemAddress: number;
  Body: string;
  BodyID: number;
}

export interface EdLeaveBody extends EdEvent<'LeaveBody'> {
  StarSystem: string;
  SystemAddress: number;
  Body: string;
  BodyID: number;
}
