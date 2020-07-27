// tslint:disable:no-console

import { writeFileSync } from 'fs';
import { eventManager } from '@src/ed/event-manager';
import { EdNavRouteEvent, EdFSDJumpEvent } from '@src/ed/interfaces';

export interface NavRouteOptions {
  output: string;
  clearOnStart?: boolean;
}

export class NavRoute {
  public static readonly defaultOptions: Partial<NavRouteOptions> = {
    clearOnStart: true,
  };

  protected output: string;
  protected route?: string[];
  protected currentSystem!: string;
  protected currentRouteIndex!: number;

  constructor(options: NavRouteOptions) {
    const opt = { ...NavRoute.defaultOptions, ...options };

    this.output = options.output;
    eventManager.on('NavRoute', this.onNewRoute.bind(this));
    eventManager.on('FSDJump', this.onJump.bind(this));

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

  protected updateInfo(): void {
    let txt: string;

    if (this.route) {
      const jumps =
        this.currentRouteIndex === -1
          ? -1
          : this.route.length - this.currentRouteIndex - 1;
      const end = this.route[this.route.length - 1];

      txt =
        jumps === 1
          ? `${this.currentSystem} > ${end}`
          : jumps > 1
          ? `${this.currentSystem} > ${jumps} jumps > ${end}`
          : `${this.currentSystem} > ??? > ${end}`;
    } else {
      txt = this.currentSystem;
    }

    txt = ` ${txt} `;
    try {
      writeFileSync(this.output, txt);
      console.log(txt);
    } catch (e) {
      console.error(`Error writting NavRoute to ${this.output}`);
    }
  }
}
