import type { TrialResult } from '@/hooks/useGameState';

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
