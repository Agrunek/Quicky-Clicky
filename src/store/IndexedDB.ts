import type { TrialResult } from '@/hooks/useGameState';

const DB_NAME = 'GAMES_HISTORY';
const DB_VERSION = 1;
const UUID_KEY = 'uuid';
const TIMESTAMP_KEY = 'timestamp';
const ATTEMPT_KEY = 'attempt';

export const SIMPLE_REACTION_STORE = 'SimpleReaction';
export const PHYSICAL_MATCHING_STORE = 'PhysicalMatching';
export const NAME_MATCHING_STORE = 'NameMatching';
export const CLASS_MATCHING_STORE = 'ClassMatching';
export const VISUAL_SEARCH_STORE = 'VisualSearch';

export type StoreName =
  | typeof CLASS_MATCHING_STORE
  | typeof NAME_MATCHING_STORE
  | typeof PHYSICAL_MATCHING_STORE
  | typeof SIMPLE_REACTION_STORE
  | typeof VISUAL_SEARCH_STORE;

const ALL_STORES = [
  SIMPLE_REACTION_STORE,
  PHYSICAL_MATCHING_STORE,
  NAME_MATCHING_STORE,
  CLASS_MATCHING_STORE,
  VISUAL_SEARCH_STORE,
] as const satisfies readonly StoreName[];

interface StoreEntry {
  [ATTEMPT_KEY]: TrialResult[];
  [TIMESTAMP_KEY]: number;
  [UUID_KEY]: string;
}

const DB: IDBDatabase | null = await new Promise((resolve) => {
  const DBOpenRequest = indexedDB.open(DB_NAME, DB_VERSION);

  DBOpenRequest.onerror = () => {
    console.warn('App connection to IndexedDB is being blocked by your browser!');
    console.info('To unlock app full potential, please change your current browser settings.');
    resolve(null);
  };

  DBOpenRequest.onblocked = () => {
    console.warn('Database upgrade is blocked by another open tab/window.');
  };

  DBOpenRequest.onupgradeneeded = () => {
    const config = DBOpenRequest.result;

    if (!config.objectStoreNames.contains(SIMPLE_REACTION_STORE)) {
      const objectStore = config.createObjectStore(SIMPLE_REACTION_STORE, { keyPath: UUID_KEY });
      objectStore.createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY);
    }

    if (!config.objectStoreNames.contains(PHYSICAL_MATCHING_STORE)) {
      const objectStore = config.createObjectStore(PHYSICAL_MATCHING_STORE, { keyPath: UUID_KEY });
      objectStore.createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY);
    }

    if (!config.objectStoreNames.contains(NAME_MATCHING_STORE)) {
      const objectStore = config.createObjectStore(NAME_MATCHING_STORE, { keyPath: UUID_KEY });
      objectStore.createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY);
    }

    if (!config.objectStoreNames.contains(CLASS_MATCHING_STORE)) {
      const objectStore = config.createObjectStore(CLASS_MATCHING_STORE, { keyPath: UUID_KEY });
      objectStore.createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY);
    }

    if (!config.objectStoreNames.contains(VISUAL_SEARCH_STORE)) {
      const objectStore = config.createObjectStore(VISUAL_SEARCH_STORE, { keyPath: UUID_KEY });
      objectStore.createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY);
    }

    console.info('New version of database has been created.');
  };

  DBOpenRequest.onsuccess = () => {
    console.info('Successfuly connected to database! Have fun 🥳');
    resolve(DBOpenRequest.result);
  };
});

if (DB) {
  DB.onerror = (event) => {
    const request = event.target as IDBRequest | null;
    console.error(`Database error: ${request?.error || '<unknown>'}`);
  };

  DB.onclose = () => {
    console.info('Database has been closed!');
  };

  DB.onversionchange = () => {
    DB.close();
    console.warn('Please, refresh the page for new version of database.');
  };
}

export const saveGameAttempt = async (storeName: StoreName, attempt: TrialResult[]) => {
  return new Promise<number>((resolve) => {
    if (DB) {
      const uuid = crypto.randomUUID();
      const timestamp = Date.now();

      try {
        const transaction = DB.transaction(storeName, 'readwrite');

        transaction.oncomplete = () => resolve(timestamp);
        transaction.onerror = () => {
          console.error(`Operation error: ${transaction.error}`);
          resolve(-1);
        };

        transaction.objectStore(storeName).add({ attempt, timestamp, uuid } satisfies StoreEntry);
      } catch (error) {
        console.error(`Transaction error: ${error}`);
        resolve(-2);
      }
    } else {
      resolve(NaN);
    }
  });
};

export const readGameAttempts = async (storeName?: StoreName) => {
  return new Promise<StoreEntry[]>((resolve) => {
    if (DB) {
      const storeNames = storeName ? [storeName] : ALL_STORES;

      try {
        const transaction = DB.transaction(storeNames);
        const results: StoreEntry[] = [];

        transaction.oncomplete = () => resolve(results);
        transaction.onerror = () => {
          console.error(`Operation error: ${transaction.error}`);
          resolve([]);
        };

        storeNames.forEach((store) => {
          const request: IDBRequest<StoreEntry[]> = transaction.objectStore(store).getAll();
          request.onsuccess = () => results.push(...request.result);
        });
      } catch (error) {
        console.error(`Transaction error: ${error}`);
        resolve([]);
      }
    } else {
      resolve([]);
    }
  });
};

export default DB;
