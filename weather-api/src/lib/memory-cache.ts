class MemoryCache<K = string, V = any> {
	private store = new Map<K, { value: V; expiresAt: number }>();

	// Set a value with a TTL (time-to-live)
	set(key: K, value: V, ttlMs: number) {
		this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
	}

	// Retrieve a value if it has not expired
	get(key: K): V | null {
		const hit = this.store.get(key);
		if (!hit) return null;
		if (Date.now() > hit.expiresAt) {
			this.store.delete(key);
			return null;
		}
		return hit.value;
	}

	// Clears the cache
	clear() {
		this.store.clear();
	}
}

export const memoryCache = new MemoryCache();
