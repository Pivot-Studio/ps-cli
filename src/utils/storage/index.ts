import { LocalStorage } from 'node-localstorage';
import { LOCAL_STORAGE } from '@/constant';
class ZeusStorage {
  storage: LocalStorage;
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
