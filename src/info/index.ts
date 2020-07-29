import { EdDataKey, EdData, dataManager } from '@src/ed/data-manager';
import { writeFileSync } from 'fs';
import { basename } from 'path';

const VERBOSE = true;

type EdDataSubSet<E extends EdDataKey> = Pick<EdData, E>;
type OutputGeneratorType = 'writeFile';

interface OutputGenerator<G extends OutputGeneratorType> {
  /** type of generator */
  type: G;
  /** data required */
  data: EdDataKey[];
}

export interface OutputGeneratorWriteFile extends OutputGenerator<'writeFile'> {
  /** path of the file where the output is going to be written */
  output: string;
  /** function outputting the text from the required data */
  generator: <E extends EdDataKey>(data: EdDataSubSet<E>) => string;
  /** If true, it will empty the output file before starting */
  clearOnStart?: boolean;
}

export function addOutputGenerator(
  config: OutputGenerator<OutputGeneratorType>
): void {
  function call(timestamp: number) {
    if (timestamp <= lastCall) return;
    lastCall = timestamp;

    const values = config.data.reduce((values, key) => {
      const val = dataManager.get(key);
      if (val !== undefined) {
        (values as any)[key] = val;
      }
      return values;
    }, {} as EdData);

    if (isGeneratorWriteFile(config)) {
      generatorWriteFile(config.output, config.generator(values));
    }
  }

  let lastCall: number = 0;

  config.data.forEach((event) => {
    dataManager.on(event, call);
  });
}

type CheckType<T> = (config: any) => config is T;
const isGeneratorWriteFile = ((config: any) =>
  config.type === 'writeFile') as CheckType<OutputGeneratorWriteFile>;

async function generatorWriteFile(path: string, text: string): Promise<void> {
  try {
    writeFileSync(path, text);
    if (VERBOSE) {
      console.log(`${basename(path)} => ${text}`);
    }
  } catch (e) {
    console.error(`Error writting NavRoute to ${path}`);
  }
}
