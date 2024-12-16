#!/usr/bin/env python3
""" Least recently Used Caching
"""


from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """least recently use algorithm"""
    def __init__(self):
        """initialising"""
        super().__init__()
        self.lru = []

    def put(self, key, item):
        """put the item in cache using lru method"""
        if key is not None and item is not None:
            self.cache_data[key] = item

            if key in self.lru:
                self.lru.remove(key)
            self.lru.append(key)

            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                least_recently_used_key = self.lru.pop(0)
                del self.cache_data[least_recently_used_key]
                print("DISCARD: {}".format(least_recently_used_key))

    def get(self, key):
        """get the value of the key"""
        if key is None or key not in self.cache_data:
            return None
        self.lru.remove(key)
        self.lru.append(key)
        return self.cache_data[key]
