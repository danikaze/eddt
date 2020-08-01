import { EventType } from '@src/ed/event-manager';
import { addEdEventListener, EdEventProcessor } from '.';
import * as mining from './mining';
import * as misc from './misc';
import * as nav from './nav';
import * as pirates from './pirates';

type EventProcessorModule = {
  [key: string]: EdEventProcessor<EventType>;
};

export function registerAllEvents(): void {
  registerModuleEvents(mining as EventProcessorModule);
  registerModuleEvents(misc as EventProcessorModule);
  registerModuleEvents(nav as EventProcessorModule);
  registerModuleEvents(pirates as EventProcessorModule);
}

function registerModuleEvents(module: EventProcessorModule): void {
  Object.values(module).forEach((eventProcessor) =>
    addEdEventListener(eventProcessor)
  );
}
