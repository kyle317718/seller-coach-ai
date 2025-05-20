interface StorageOptions {
    dbName?: string;
    storeName?: string;
    version?: number;
}

const defaultOptions: Required<StorageOptions> = {
    dbName: 'analysisDB',
    storeName: 'analysisStore',
    version: 1
};

class StorageManager {
    private db: IDBDatabase | null = null;
    private options: Required<StorageOptions>;
    private isIndexedDBSupported: boolean;

    constructor(options: StorageOptions = {}) {
        this.options = { ...defaultOptions, ...options };
        this.isIndexedDBSupported = typeof window !== 'undefined' && 'indexedDB' in window;

        if (this.isIndexedDBSupported) {
            this.initDB();
        }
    }

    private async initDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.options.dbName, this.options.version);

            request.onerror = () => {
                console.error('IndexedDB 초기화 실패');
                reject();
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.options.storeName)) {
                    db.createObjectStore(this.options.storeName);
                }
            };
        });
    }

    async setItem(key: string, value: any): Promise<void> {
        // IndexedDB에 저장 시도
        if (this.isIndexedDBSupported && this.db) {
            try {
                const transaction = this.db.transaction([this.options.storeName], 'readwrite');
                const store = transaction.objectStore(this.options.storeName);
                await new Promise<void>((resolve, reject) => {
                    const request = store.put(value, key);
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject();
                });
                return;
            } catch (error) {
                console.error('IndexedDB 저장 실패:', error);
            }
        }

        // localStorage 폴백
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('localStorage 저장 실패:', error);
        }
    }

    async getItem<T>(key: string): Promise<T | null> {
        // IndexedDB에서 조회 시도
        if (this.isIndexedDBSupported && this.db) {
            try {
                const transaction = this.db.transaction([this.options.storeName], 'readonly');
                const store = transaction.objectStore(this.options.storeName);
                const value = await new Promise<T>((resolve, reject) => {
                    const request = store.get(key);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject();
                });
                return value;
            } catch (error) {
                console.error('IndexedDB 조회 실패:', error);
            }
        }

        // localStorage 폴백
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('localStorage 조회 실패:', error);
            return null;
        }
    }

    async removeItem(key: string): Promise<void> {
        // IndexedDB에서 삭제 시도
        if (this.isIndexedDBSupported && this.db) {
            try {
                const transaction = this.db.transaction([this.options.storeName], 'readwrite');
                const store = transaction.objectStore(this.options.storeName);
                await new Promise<void>((resolve, reject) => {
                    const request = store.delete(key);
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject();
                });
                return;
            } catch (error) {
                console.error('IndexedDB 삭제 실패:', error);
            }
        }

        // localStorage 폴백
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('localStorage 삭제 실패:', error);
        }
    }
}

export const storage = new StorageManager(); 