import { EventType, EventData, eventManager } from '@src/ed/event-manager';
import { EdDataManager, dataManager } from '@src/ed/data-manager';

/**
 * Definition for EdEventProcessors
 */
export interface EdEventProcessor<E extends EventType> {
  event: E;
  processor: (dataManager: EdDataManager, event: EventData[E]) => void;
}

/**
 * Register an EdEventProcessor to listen to an specific EdEvent
 */
export function addEdEventListener<E extends EventType>(
  definition: EdEventProcessor<E>
): void {
  eventManager.on(definition.event, (event) => {
    definition.processor(dataManager, event);
    dataManager.update();
  });
}
