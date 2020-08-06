import { existsSync } from 'fs';
import { join, relative } from 'path';
import { LOCALES_FOLDER } from '@src/constants';
import { setLocale, t, isDefined, TranslationData } from '@src/utils/i18n';
import { testCases } from './data';

function addUnique<T>(arr: T[], elem: T): void {
  if (arr.includes(elem)) return;
  arr.push(elem);
}

const lang = process.argv[2];

if (!lang) {
  console.error(
    `Locale not defined. Run this command as:\n  npm run test-locale {LOCALE}`
  );
  process.exit(1);
}

const localePath = join(LOCALES_FOLDER, `${lang}.json`);
if (!existsSync(localePath)) {
  console.error(`Locale ${localePath} not found`);
  process.exit(2);
}

console.log(`Displaying locale for ${relative(__dirname, localePath)}`);
console.log(`--------------------------------------------------------`);
setLocale(lang);

const keyErrors: string[] = [];
const undefinedOnKeys: string[] = [];
const missingKeys: string[] = [];

testCases.forEach(({ key, data }) => {
  try {
    if (
      !isDefined(key, lang) &&
      !isDefined(`${key}1` as keyof TranslationData, lang)
    ) {
      addUnique(missingKeys, key);
      return;
    }
    const text = t(key, data);
    console.log('\n*', key, '=>', data);
    console.log(text);

    if (typeof text === 'string') {
      if (text?.includes('undefined')) {
        addUnique(undefinedOnKeys, key);
      }
    } else if (text) {
      text.forEach((txt) => {
        if (txt?.includes('undefined')) {
          addUnique(undefinedOnKeys, key);
        }
      });
    }
  } catch (e) {
    const msg = `${e.message} Position ${e.location.start.line}:${e.location.start.column}`;
    addUnique(keyErrors, `${key}: ${msg}`);
  }
});

console.log(`\n--------------------------------------------------------`);
if (missingKeys.length > 0) {
  console.log(`! Missing translations:\n - ${missingKeys.join('\n - ')}`);
} else {
  console.log('- No missing translations found :)');
}
if (keyErrors.length > 0) {
  console.log(`! Errors found on:\n - ${keyErrors.join('\n - ')}`);
} else {
  console.log('- No errors found :)');
}
if (undefinedOnKeys.length > 0) {
  console.log(`! undefined found on:\n - ${undefinedOnKeys.join('\n - ')}`);
} else {
  console.log('- No undefined found :)');
}

process.exit(0);
