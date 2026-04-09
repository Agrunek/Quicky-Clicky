import type { TrialResult } from '@/hooks/useGameState';

import words from '@/constants/words.json' with { type: 'json' };

export const getRandomItem = <T>(collection: Array<T>) => {
  return collection[Math.floor(Math.random() * collection.length)];
};

export const getWordPair = (history: TrialResult[], trialsRemaining: number): [string, string] => {
  const templateWord = getRandomItem(words);

  const correctHistory = history.filter((entry) => !entry.falseStart);
  const matchCount = correctHistory.filter((entry) => entry.intentMatch).length;

  const originalMatchCount = Math.ceil(correctHistory.length / 2);
  const matchChance = (originalMatchCount - matchCount) / trialsRemaining;

  const sameWord = Math.random() < matchChance;
  const filteredWords = words.filter((word) => word !== templateWord);

  const compareWord = sameWord ? templateWord : getRandomItem(filteredWords);

  return [templateWord, compareWord];
};
