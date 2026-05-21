const DB_NAME = 'GAMES_HISTORY';
const DB_VERSION = 1;

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
    // Create store for the DB

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
