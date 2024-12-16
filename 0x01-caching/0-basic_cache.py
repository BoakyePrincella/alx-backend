#!/usr/bin/env python3
""" Basic Caching
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Basic dictionary"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """assign key to value"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """get the value of the key"""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
