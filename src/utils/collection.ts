import type { TrialResult } from '@/hooks/useGameState';

import {
  ALPHABET,
  POSSIBLE_FONT_FAMILIES,
  POSSIBLE_FONT_SIZES,
  POSSIBLE_FONT_WEIGHTS,
  SIMPLE_ALPHABET,
  SIMPLE_DIGITS,
} from '@/constants/constants';
import words from '@/constants/words.json' with { type: 'json' };

export const getRandomItem = <T>(collection: Array<T>) => {
  return collection[Math.floor(Math.random() * collection.length)];
};

export const getRandomTextStyle = (): React.CSSProperties => {
  return {
    fontFamily: getRandomItem(POSSIBLE_FONT_FAMILIES),
    fontSize: getRandomItem(POSSIBLE_FONT_SIZES),
    fontWeight: getRandomItem(POSSIBLE_FONT_WEIGHTS),
  };
};

const getMatchChance = (history: TrialResult[], trialsRemaining: number) => {
  const correctHistory = history.filter((entry) => !entry.falseStart);
  const matchCount = correctHistory.filter((entry) => entry.intentMatch).length;

  const totalTrials = correctHistory.length + trialsRemaining;
  const targetMatches = totalTrials * 0.5;

  const matchesNeeded = targetMatches - matchCount;
  return Math.max(0, Math.min(1, matchesNeeded / trialsRemaining));
};

const pickWithMatch = <T>(history: TrialResult[], trialsRemaining: number, onMatch: () => T, onNoMatch: () => T): T => {
  const shouldMatch = Math.random() < getMatchChance(history, trialsRemaining);
  return shouldMatch ? onMatch() : onNoMatch();
};

export const getWordPair = (history: TrialResult[], trialsRemaining: number): [string, string] => {
  const templateWord = getRandomItem(words);

  const compareWord = pickWithMatch(
    history,
    trialsRemaining,
    () => templateWord,
    () => getRandomItem(words.filter((word) => word !== templateWord)),
  );

  return [templateWord, compareWord];
};

export const getSymbolPair = (history: TrialResult[], trialsRemaining: number): [string, string] => {
  const seed = Math.random() < 0.5 ? 'letter' : 'digit';
  const templateCollection = seed === 'letter' ? SIMPLE_ALPHABET : SIMPLE_DIGITS;
  const templateSymbol = getRandomItem(templateCollection);

  const compareCollection = pickWithMatch(
    history,
    trialsRemaining,
    () => templateCollection.filter((symbol) => symbol !== templateSymbol),
    () => (seed === 'digit' ? SIMPLE_ALPHABET : SIMPLE_DIGITS),
  );

  const compareSymbol = getRandomItem(compareCollection);

  return [templateSymbol, compareSymbol];
};

export const getAlphaPair = (
  history: TrialResult[],
  trialsRemaining: number,
  numberOfAlphas: number,
): [string, string[]] => {
  const templateAlpha = getRandomItem(ALPHABET);

  const filteredAlphas = ALPHABET.filter((alpha) => alpha !== templateAlpha);
  const compareAlphasPure = [...Array(numberOfAlphas)].map(() => getRandomItem(filteredAlphas));

  const compareAlphas = pickWithMatch(
    history,
    trialsRemaining,
    () => {
      const copy = [...compareAlphasPure];
      copy[Math.floor(Math.random() * copy.length)] = templateAlpha;
      return copy;
    },
    () => compareAlphasPure,
  );

  return [templateAlpha, compareAlphas];
};

const sum = (arr: number[]) => {
  return arr.reduce((sum, val) => sum + val, 0);
};

export const calculateStats = (attempt: TrialResult[]) => {
  const nonFalseStarts = attempt.filter((res) => !res.falseStart);
  const falseStartCount = attempt.length - nonFalseStarts.length;

  const times = nonFalseStarts.map((res) => res.reactionTimeMs);

  const meanTime = sum(times) / times.length || 0;
  const minTime = Math.min(...(times.length ? times : [0]));
  const maxTime = Math.max(...(times.length ? times : [0]));
  const sdTime = Math.sqrt(sum(times.map((time) => (time - meanTime) ** 2)) / times.length) || 0;

  const matches = nonFalseStarts.filter((res) => res.intentMatch === true);
  const totalMatchTime = sum(matches.map((res) => res.reactionTimeMs));
  const totalMatchErrors = matches.filter((res) => !res.isCorrect).length;

  const noMatches = nonFalseStarts.filter((res) => res.intentMatch === false);
  const totalNoMatchTime = sum(noMatches.map((res) => res.reactionTimeMs));
  const totalNoMatchErrors = noMatches.filter((res) => !res.isCorrect).length;

  const totalTime = totalMatchTime + totalNoMatchTime;
  const totalErrors = totalMatchErrors + totalNoMatchErrors;

  return {
    falseStartCount,
    matchesCount: matches.length,
    maxTime,
    meanTime,
    minTime,
    noMatchesCount: noMatches.length,
    sdTime,
    totalErrors,
    totalMatchErrors,
    totalMatchTime,
    totalNoMatchErrors,
    totalNoMatchTime,
    totalTime,
  };
};
