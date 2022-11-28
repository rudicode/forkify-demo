
// SimpleCache TODO:
// the cache never expires so it will grow indefinetly
//

export class SimpleCache {
    // private
    #data;
    #cacheName;

    constructor(cacheName = 'simpleC') {
        this.#data = new Map();
        this.#cacheName = cacheName;
    }

    find(id, verbosity = true) {
        const result = this.#data.get(id);
        if (result) {
            result.cacheFindCount += 1
            if (verbosity)
                console.log(`${this.#cacheName} cache, found (${result.cacheFindCount}): ${id}`);
        }
        return result;
    }

    set(dataKey, dataIn, verbosity = true) {
        // NOTE: it may not be a good idea to add a property to the incoming data
        // for the cache to use this way.
        // TODO: Maybe dataIn could be wrapped in a cache
        // object that has the cacheFindCount and maybe other properties in the
        // future.
        dataIn.cacheFindCount = 0;
        this.#data.set(dataKey, dataIn);
        if (verbosity)
            console.log(`${this.#cacheName} cache, add: ${dataKey}`);
    }

    log() {
        console.log(`${this.#cacheName} Cache size: `, this.#data.size);
        console.log(`${this.#cacheName} Cache log: `, this.#data);
    }
}

// const recipeCache = new SimpleCache();
// recipeCache.set('aaa', 45);
// const value = recipeCache.find('aaa');
// console.log('testcache: ', value);
