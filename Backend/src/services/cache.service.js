/**
 * High-Performance In-Memory LRU & TTL Cache Service for Converse-AI
 * Reduces repeated MongoDB queries to O(1) in-memory lookups.
 */

class LRUTTLCache {
  constructor({ maxItems = 500, defaultTTL = 5 * 60 * 1000 } = {}) {
    this.maxItems = maxItems;
    this.defaultTTL = defaultTTL; // 5 minutes default
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Retrieves an item from cache if present and not expired
   * @param {string} key
   * @returns {any|null}
   */
  get(key) {
    if (!this.cache.has(key)) {
      this.misses++;
      return null;
    }

    const entry = this.cache.get(key);
    const now = Date.now();

    // Check expiration
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    // Refresh LRU order: delete and re-insert
    this.cache.delete(key);
    this.cache.set(key, entry);

    this.hits++;
    return entry.value;
  }

  /**
   * Stores an item with a time-to-live
   * @param {string} key
   * @param {any} value
   * @param {number} [ttl]
   */
  set(key, value, ttl = this.defaultTTL) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxItems) {
      // Evict oldest (least recently used) entry
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    });
  }

  /**
   * Check if key exists and is valid
   * @param {string} key
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Delete a key from cache
   * @param {string} key
   */
  delete(key) {
    return this.cache.delete(key);
  }

  /**
   * Clear all items from cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Return stats for diagnostics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxItems: this.maxItems,
      hits: this.hits,
      misses: this.misses,
      hitRatio: this.hits + this.misses > 0 ? (this.hits / (this.hits + this.misses)).toFixed(3) : 0,
    };
  }
}

// Global cache instances for chatbots and public profiles
export const chatbotCache = new LRUTTLCache({ maxItems: 500, defaultTTL: 5 * 60 * 1000 });
export const publicProfileCache = new LRUTTLCache({ maxItems: 500, defaultTTL: 5 * 60 * 1000 });
