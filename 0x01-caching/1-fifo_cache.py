#!/usr/bin/env python3
""" FIFO cache
"""


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFO cache
    """

    def __init__(self):
        """ Initiliaze
        """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """the put function of the cache"""
        if key is not None and item is not None:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                oldest_key = self.queue.pop(0)
                del self.cache_data[oldest_key]
                print("DISCARD: {}".format(oldest_key))
            self.queue.append(key)

    def get(self, key):
        """get the value of the key"""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
