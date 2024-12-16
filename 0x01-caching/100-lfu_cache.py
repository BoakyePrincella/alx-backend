#!/usr/bin/env python3
"""This is the lfu cache file"""


from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """Thisi is the lfu caching class"""

    def __init__(self):
        """The initializoer of ther classe"""
        super().__init__()
        self.cache_usage = {}
        self.cache_order = []

    def put(self, key, item):
        """The put function"""
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            k = self.get_lfu_key()
            del self.cache_data[k]
            del self.cache_usage[k]
            self.cache_order.remove(k)
            print("DISCARD: {}".format(k))

        self.cache_order.append(key)
        self.cache_usage[key] = 1

    def get(self, key):
        """The get method"""
        if key is None or key not in self.cache_data:
            return None

        self.cache_usage[key] += 1
        self.cache_order.remove(key)
        self.cache_order.append(key)

        return self.cache_data.get(key)

    def get_lfu_key(self):
        """the get fluf key method"""

        min_usage = min(self.cache_usage.values())
        lfu_keys = [
                key
                for key, usage in self.cache_usage.items()
                if usage == min_usage
                ]
        return self.get_lru_key(lfu_keys)

    def get_lru_key(self, keys):
        """The lru method"""
        lru_key = None
        lru_index = len(self.cache_order)

        for key in keys:
            index = self.cache_order.index(key)
            if index < lru_index:
                lru_key = key
                lry_index = index

        return lru_key
