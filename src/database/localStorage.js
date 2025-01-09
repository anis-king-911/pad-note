class localStorageApi {
  constructor(DatabaseReference = "", DefaultDataOptions = {}) {
    if (typeof DatabaseReference !== "string") {
      throw new Error("DatabaseReference must be a string.");
    }

    this.dbRef = DatabaseReference;
    this.DefaultDataOptions = {
      identifierWord: DefaultDataOptions.identifierWord || "_id",
      identifierMethod: DefaultDataOptions.identifierMethod || "crypto uuid",
    };

    if (typeof window !== "undefined" && !localStorage.getItem(this.dbRef)) {
      localStorage.setItem(this.dbRef, JSON.stringify({}));
    }
  }

  _isBrowser() {
    return typeof window !== "undefined";
  }

  _loadDatabase() {
    if (!this._isBrowser()) return {};
    try {
      return JSON.parse(localStorage.getItem(this.dbRef)) || {};
    } catch (error) {
      console.error("Error loading database:", error);
      return {};
    }
  }

  _saveDatabase(data) {
    if (!this._isBrowser()) return;
    try {
      localStorage.setItem(this.dbRef, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving database:", error);
    }
  }

  _generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  async getIdentifier(word, method) {
    const dbUuid = this._generateUUID();
    const Word = ["_key", "_id"].includes(word) ? word : "_id";
    const Method = method === "crypto uuid" ? dbUuid : dbUuid;
    return { Word, Method };
  }

  insert(data) {
    if (!this._isBrowser()) return null;
  
    if (typeof data !== "object" || data === null) {
      throw new Error("Data must be an object.");
    }
  
    const db = this._loadDatabase();
    const identifierWord = this.DefaultDataOptions.identifierWord; // Use the correct property
    const id = data[identifierWord] || this._generateUUID();
  
    const newItem = {
      [identifierWord]: id,
      "_createdAt": new Date().toISOString(),
      "_updatedAt": new Date().toISOString(),
      ...data,
    };
  
    db[id] = newItem;
    this._saveDatabase(db);
    return newItem;
  }  

  load() {
    if (!this._isBrowser()) return {};
    return this._loadDatabase();
  }

  find(id) {
    if (!this._isBrowser()) return null;
    if (typeof id !== "string") {
      throw new Error("ID must be a string.");
    }

    const db = this._loadDatabase();
    return db[id] || null;
  }

  remove(id) {
    if (!this._isBrowser()) return false;
    if (typeof id !== "string") {
      throw new Error("ID must be a string.");
    }

    const db = this._loadDatabase();
    if (db[id]) {
      delete db[id];
      this._saveDatabase(db);
      return true;
    }

    return false;
  }

  update(id, updates) {
    if (!this._isBrowser()) return null;
    if (typeof id !== "string" || typeof updates !== "object" || updates === null) {
      throw new Error("Invalid arguments.");
    }

    const db = this._loadDatabase();
    if (!db[id]) {
      throw new Error("Item not found.");
    }

    db[id] = {
      ...db[id],
      ...updates,
      "_updatedAt": new Date().toISOString(),
    };

    this._saveDatabase(db);
    return db[id];
  }
}

export default localStorageApi;

