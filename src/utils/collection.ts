import type { TrialResult } from '@/hooks/useGameState';

import { DIGITS_STRINGS, UPPERCASE_ALPHABET } from '@/constants/constants';
import words from '@/constants/words.json' with { type: 'json' };

export const getRandomItem = <T>(collection: Array<T>) => {
  return collection[Math.floor(Math.random() * collection.length)];
};

export const getWordPair = (history: TrialResult[], trialsRemaining: number): [string, string] => {
  const templateWord = getRandomItem(words);

  const correctHistory = history.filter((entry) => !entry.falseStart);
  const matchCount = correctHistory.filter((entry) => entry.intentMatch).length;

  const totalTrials = correctHistory.length + trialsRemaining;
  const targetMatches = totalTrials * 0.5;

  const matchesNeeded = targetMatches - matchCount;
  const matchChance = Math.max(0, Math.min(1, matchesNeeded / trialsRemaining));

  const sameWord = Math.random() < matchChance;
  const filteredWords = words.filter((word) => word !== templateWord);

  const compareWord = sameWord ? templateWord : getRandomItem(filteredWords);

  return [templateWord, compareWord];
};

export const getSymbolPair = (history: TrialResult[], trialsRemaining: number): [string, string] => {
  const seed = Math.random() < 0.5 ? 'letter' : 'digit';
  const templateCollection = seed === 'letter' ? UPPERCASE_ALPHABET : DIGITS_STRINGS;

  const templateSymbol = getRandomItem(templateCollection);

  const correctHistory = history.filter((entry) => !entry.falseStart);
  const matchCount = correctHistory.filter((entry) => entry.intentMatch).length;

  const totalTrials = correctHistory.length + trialsRemaining;
  const targetMatches = totalTrials * 0.5;

  const matchesNeeded = targetMatches - matchCount;
  const matchChance = Math.max(0, Math.min(1, matchesNeeded / trialsRemaining));

  const sameClass = Math.random() < matchChance;
  const filteredSymbols = templateCollection.filter((symbol) => symbol !== templateSymbol);

  const compareSymbol = sameClass
    ? getRandomItem(filteredSymbols)
    : getRandomItem(seed === 'digit' ? UPPERCASE_ALPHABET : DIGITS_STRINGS);

  return [templateSymbol, compareSymbol];
};
