#!/usr/bin/env python3
""" Most Recently Used Caching
"""


from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """most recently use algorithm"""
    def __init__(self):
        """initialising"""
        super().__init__()
        self.mru = []

    def put(self, key, item):
        """put the item in cache using mru method"""
        if key is not None and item is not None:
            self.cache_data[key] = item

            if key in self.mru:
                self.mru.remove(key)
            self.mru.append(key)

            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                most_recently_used_key = self.mru.pop(-2)
                del self.cache_data[most_recently_used_key]
                print("DISCARD: {}".format(most_recently_used_key))

    def get(self, key):
        """get the value of the key"""
        if key is None or key not in self.cache_data:
            return None
        self.mru.remove(key)
        self.mru.append(key)
        return self.cache_data[key]
