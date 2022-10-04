import { LocalStorage } from 'node-localstorage';
import { LOCAL_STORAGE } from '@/constant';
interface Storage {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}
class ZeusStorage {
  storage: Storage;
  constructor() {
    this.storage = new LocalStorage(LOCAL_STORAGE);
  }
  get(key: string) {
    return this.storage.getItem(key);
  }
  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
}
export default new ZeusStorage();
