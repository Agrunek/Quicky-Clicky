const DB_NAME = 'GAMES_HISTORY';
const DB_VERSION = 1;

const SIMPLE_REACTION_STORE = 'SimpleReaction';
const PHYSICAL_MATCHING_STORE = 'PhysicalMatching';
const NAME_MATCHING_STORE = 'NameMatching';
const CLASS_MATCHING_STORE = 'ClassMatching';
const VISUAL_SEARCH_STORE = 'VisualSearch';

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
      config.createObjectStore(SIMPLE_REACTION_STORE, { autoIncrement: true });
    }

    if (!config.objectStoreNames.contains(PHYSICAL_MATCHING_STORE)) {
      config.createObjectStore(PHYSICAL_MATCHING_STORE, { autoIncrement: true });
    }

    if (!config.objectStoreNames.contains(NAME_MATCHING_STORE)) {
      config.createObjectStore(NAME_MATCHING_STORE, { autoIncrement: true });
    }

    if (!config.objectStoreNames.contains(CLASS_MATCHING_STORE)) {
      config.createObjectStore(CLASS_MATCHING_STORE, { autoIncrement: true });
    }

    if (!config.objectStoreNames.contains(VISUAL_SEARCH_STORE)) {
      config.createObjectStore(VISUAL_SEARCH_STORE, { autoIncrement: true });
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
    console.error(`Database error: ${request?.error}`);
  };

  DB.onclose = () => {
    console.info('Database has been closed!');
  };

  DB.onversionchange = () => {
    DB.close();
    console.warn('Please, refresh the page for new version of database.');
  };
}

export default DB;
