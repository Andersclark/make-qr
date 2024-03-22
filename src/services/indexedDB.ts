// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// Creates a database instance
// Instances can be versioned with integers.
function createDatabase(name: string, version = 0): IDBDatabase | null {
  let db: null | IDBDatabase = null;
  const openDBRequest = window.indexedDB.open(name)
  openDBRequest.onsuccess = (ev: Event )=> {
    if(openDBRequest.result) {
      db = openDBRequest.result;
      db.onerror = console.error
    }
  }
  openDBRequest.onerror = (ev:Event)=> {
    console.error(openDBRequest.error, ev)
  }
  return db;
}

// Create the equivalent of a table in a database
function createStore(db: IDBDatabase, name: string, indexKey: string): IDBObjectStore {
  return db.createObjectStore(name, {
    keyPath: indexKey
  });
}


export function getIDB(name: string, indexProperty: string){
  const dbVersion= Number(localStorage.getItem(`IDB-version-${name}`));
  const db = createDatabase(name, dbVersion)
  let store;
  if (db instanceof IDBDatabase) {
    store = createStore(db, name, indexProperty )
  }
  return {db, store};
}


function setTransactionHandlers(transaction: IDBTransaction) {
  transaction.oncomplete = (event) => {
    console.info("[IDB] Transaction completed");
  };
  transaction.onerror = (event) => {
    console.error("[IDB] Transaction failed");
  };
  transaction.onabort = (event) => {
    console.error("[IDB] Transaction aborted");
  };
}

export function add(item: unknown, storeName: string, indexPath: string, callback: ()=> void) {
  const { db, store} = getIDB(storeName, indexPath)
  const transaction = db.transaction([storeName], "readwrite");
  setTransactionHandlers(transaction, callback);
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.add(customer);
  request.onsuccess = (event) => {
    callback()
  };
}
