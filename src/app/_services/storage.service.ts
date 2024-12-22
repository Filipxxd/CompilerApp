import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    if (this._storage) return;
    
    this._storage = await this.storage.create()
  }

  public async get(key: string) {
    await this.init();
    return this._storage?.get(key)
  }

  public async set(key: string, value: any) {
    await this.init();
    this._storage?.set(key, value)
  }
}
