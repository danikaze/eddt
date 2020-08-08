import { EventType } from '@src/ed/event-manager';
import { addEdEventListener, EdEventProcessor } from '.';
import * as mining from './mining';
import * as misc from './misc';
import * as missions from './missions';
import * as nav from './nav';
import * as combat from './combat';

type EventProcessorModule = {
  [key: string]: EdEventProcessor<EventType>;
};

export function registerAllEvents(): void {
  registerModuleEvents(mining as EventProcessorModule);
  registerModuleEvents(misc as EventProcessorModule);
  registerModuleEvents(missions as EventProcessorModule);
  registerModuleEvents(nav as EventProcessorModule);
  registerModuleEvents(combat as EventProcessorModule);
}

function registerModuleEvents(module: EventProcessorModule): void {
  Object.values(module).forEach((eventProcessor) =>
    addEdEventListener(eventProcessor)
  );
}
