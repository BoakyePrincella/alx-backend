#!/usr/bin/env python3
""" LIFO cache
"""


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """LIFO caching class"""
    def __init__(self):
        """ Initializing
        """
        super().__init__()
        self.stack = []

    def put(self, key, item):
        """place the key and item using lifo method"""
        if key is not None and item is not None:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                k = self.stack.pop()
                del self.cache_data[k]
                print(f"DISCARD: {k}")
            self.stack.append(key)

    def get(self, key):
        """get the value of the key"""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
