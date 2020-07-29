// tslint:disable:no-console

import { writeFileSync } from 'fs';
import { eventManager } from '@src/ed/event-manager';
import {
  EdNavRouteEvent,
  EdFSDJumpEvent,
  EdDockedEvent,
  EdUnDockedEvent,
  EdApproachBody,
} from '@src/ed/interfaces';

export interface NavRouteOptions {
  verbose?: boolean;
  output: string;
  clearOnStart?: boolean;
}

export class NavRoute {
  public static readonly defaultOptions: Partial<NavRouteOptions> = {
    verbose: false,
    clearOnStart: true,
  };

  protected verbose: boolean;
  protected output: string;
  protected route?: string[];
  protected currentBody?: string;
  protected currentStation?: string;
  protected currentSystem!: string;
  protected currentRouteIndex!: number;

  constructor(options: NavRouteOptions) {
    const opt = { ...NavRoute.defaultOptions, ...options } as Required<
      NavRouteOptions
    >;

    this.verbose = opt.verbose;
    this.output = options.output;
    eventManager.on('NavRoute', this.onNewRoute.bind(this));
    eventManager.on('FSDJump', this.onJump.bind(this));
    eventManager.on('Docked', this.onDocked.bind(this));
    eventManager.on('Undocked', this.onUndocked.bind(this));
    eventManager.on('ApproachBody', this.onApproachBody.bind(this));
    eventManager.on('LeaveBody', this.onLeaveBody.bind(this));

    if (opt.clearOnStart) {
      writeFileSync(this.output, '');
    }
  }

  protected onNewRoute(event: EdNavRouteEvent): void {
    this.route = event.Route.map((elem) => elem.StarSystem);
    this.currentRouteIndex = 0;
    this.currentSystem = this.route[0];
    this.updateInfo();
  }

  protected onJump(event: EdFSDJumpEvent): void {
    this.currentSystem = event.StarSystem;

    if (this.route) {
      const index = this.route.indexOf(event.StarSystem);
      this.currentRouteIndex = index;

      if (
        index === -1 ||
        this.currentSystem === this.route[this.route.length - 1]
      ) {
        this.route = undefined;
      }
    }

    this.updateInfo();
  }

  protected onDocked(event: EdDockedEvent): void {
    this.currentSystem = event.StarSystem;
    this.currentStation = event.StationName;
    this.updateInfo();
  }

  protected onUndocked(): void {
    this.currentStation = undefined;
    this.updateInfo();
  }

  protected onApproachBody(event: EdApproachBody): void {
    this.currentSystem = event.StarSystem;
    this.currentBody = event.Body;
    this.updateInfo();
  }

  protected onLeaveBody(): void {
    this.currentBody = undefined;
    this.updateInfo();
  }

  protected updateInfo(): void {
    let txt: string;

    const currentLocationTxt = this.currentStation
      ? `${this.currentStation} (${this.currentSystem})`
      : this.currentBody
      ? this.currentBody
      : this.currentSystem;

    if (this.route) {
      const jumps =
        this.currentRouteIndex === -1
          ? -1
          : this.route.length - this.currentRouteIndex - 1;
      const end = this.route[this.route.length - 1];

      txt =
        jumps === 1
          ? `${currentLocationTxt} > ${end}`
          : jumps > 1
          ? `${currentLocationTxt} > ${jumps} jumps > ${end}`
          : `${currentLocationTxt} > ??? > ${end}`;
    } else {
      txt = currentLocationTxt;
    }

    txt = ` ${txt} `;
    console.log(txt);
    try {
      writeFileSync(this.output, txt);
      if (this.verbose) {
        console.log(txt);
      }
    } catch (e) {
      console.error(`Error writting NavRoute to ${this.output}`);
    }
  }
}
