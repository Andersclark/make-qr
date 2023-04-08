

const STORAGE_KEY = "qr-blobs"

type AddRequest = {
  key: string;
  data: any;
  onSuccess: ()=> void;
  onError?: (this: IDBTransaction, ev: Event ) => any
}
type DeleteRequest = {
  key: string;
  onSuccess: ()=> void;
  onError?: (this: IDBTransaction, ev: Event ) => any
}
type GetRequest = {
  key: string;
  onSuccess: ()=> void;
  onError?: (this: IDBTransaction, ev: Event ) => any
}



function addItem<T>(request: AddRequest, storage: Storage) {
  const transaction = storage.db.transaction([storage.key], 'readwrite');
  transaction.oncomplete = request.onSuccess;
  if(request.onError){
    transaction.onerror = request.onError
  }
  const objectStore = transaction.objectStore(STORAGE_KEY);
  const objectStoreRequest = objectStore.add(request.data);
  objectStoreRequest.onsuccess = request.onSuccess;
}

function deleteItem(request: DeleteRequest, storage: Storage) {
  const transaction = storage.db.transaction([storage.key], 'readwrite');
  transaction.oncomplete = request.onSuccess;
  const objectStoreRequest = transaction.objectStore(storage.key).delete(request.key);
  if(request.onError) {
    transaction.onerror = request.onError
  }
};

type Storage = {
  db: IDBDatabase;
  store: IDBObjectStore;
  key: string;
}

function getItems(request: GetRequest, storage: Storage): Array<unknown> {
  const result: Array<unknown> = [];
  const objectStore = storage.db.transaction([storage.key], 'readwrite').objectStore(storage.key);
  objectStore.openCursor().onsuccess = (openRequest: IDBRequest, event: Event) => {
    const cursor = event.target?.result;
    if (!cursor) return;
    const { blob, input } = cursor.value;
    if (input === request.key) {
      result.push(cursor.value)
    }
    cursor.continue();
  };

  return result;
}
function getItem(request: GetRequest, storage: Storage): unknown {
  let result;
  const objectStore = storage.db.transaction([storage.key], 'readwrite').objectStore(storage.key);
  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target?.result;
    if (!cursor) return;
    const { blob, input } = cursor.value;
    if (input === request.key) {
      result = {...cursor.value}
    }
    else {
      cursor.continue();
    }
  };
  return result;
}


export default function createStorage(key: string){
  let storage: Storage;
  const openRequest = window.indexedDB.open(key, 4);
  openRequest.onerror = console.error;
  openRequest.onsuccess = console.info;
  return  {
    add: (request: AddRequest) => addItem(request, storage),
    delete: (request: DeleteRequest) => deleteItem(request, storage),
    get: (request: GetRequest) => getItems(request, storage)
  };
}
