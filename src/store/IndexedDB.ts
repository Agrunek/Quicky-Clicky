const DB_NAME = 'GAMES_HISTORY';
const DB_VERSION = 1;

const DB: IDBDatabase | null = await new Promise((resolve) => {
  const DBOpenRequest = indexedDB.open(DB_NAME, DB_VERSION);

  DBOpenRequest.onerror = () => {
    console.warn('App connection to IndexedDB is being blocked by your browser!');
    console.info('To unlock app full potential, please change your current browser settings.');
    resolve(null);
  };

  DBOpenRequest.onupgradeneeded = () => {
    const _db = DBOpenRequest.result;

    _db.onversionchange = () => {
      _db.close();
      console.warn('Please, refresh the page for new version of database.');
    };

    // Create store for the DB

    console.info('New version of database has been created.');
  };

  DBOpenRequest.onsuccess = () => {
    const _db = DBOpenRequest.result;

    _db.onversionchange = () => {
      _db.close();
      console.warn('Please, refresh the page for new version of database.');
    };

    console.info('Successfuly connected to database! Have fun 🥳');
    resolve(_db);
  };
});

export default DB;
