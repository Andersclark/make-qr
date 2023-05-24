import {add, getIDB} from "./indexedDB";
import {QR} from "../types";


type StorageStatus = {
  status: "success" | "error";
  info: any;
}

const STORAGE_KEY = "qr-codes"
const INDEX_PATH = "value"

export function getStore(){
  return getIDB(STORAGE_KEY, INDEX_PATH);
}

export function addItem(store:IDBObjectStore, item: QR){
  add(item, STORAGE_KEY, INDEX_PATH, console.log)
}
