
export class SimpleCache {
    // private
    #data;

    constructor() {
        this.#data = new Map();
    }

    find(id) {
        return this.#data.get(id);
    }

    set(dataKey, dataIn) {
        this.#data.set(dataKey, dataIn);
    }

    log() {
        console.log('Cache size: ', this.#data.size);
        console.log('Cache log: ', this.#data);
    }
}

// const recipeCache = new SimpleCache();
// recipeCache.set('aaa', 45);
// const value = recipeCache.find('aaa');
// console.log('testcache: ', value);
