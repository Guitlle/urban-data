# -*- coding: utf-8 -*-

"""
    urban-data settings
    ~~~~~~~~~~~~~~~~~

    Settings file .

    PLEASE NOTE: We don't need to create the two collections in MongoDB.
    Actually, we don't even need to create the database: GET requests on an
    empty/non-existant DB will be served correctly ('200' OK with an empty
    collection); DELETE/PATCH will receive appropriate responses ('404' Not
    Found), and POST requests will create database and collections when needed.
    Keep in mind however that such an auto-managed database will most likely
    perform poorly since it lacks any sort of optimized index.

    :copyright: (c) 2014 Sebastian Oliva, based on work by Nicola Iarocci.
    :license: Apache 2, see LICENSE for more details.
"""

import os

# Running on local machine. Let's just use the local mongod instance.
MONGO_HOST = 'localhost'
MONGO_PORT = 27017
#MONGO_USERNAME = 'user'
#MONGO_PASSWORD = 'user'
SORTING = True
MONGO_DBNAME = 'urban'
X_DOMAIN = '*'
PAGINATION_DEFAULT=1000
PAGINATION_LIMIT=2000
X_HEADERS = ['Authorization', 'Content-Type']
DATE_FORMAT = '%a, %d %b %Y %H:%M:%S GMT'
# let's not forget the API entry point (not really needed anyway)
#SERVER_NAME = '127.0.0.1:5000'

# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

# We enable standard client cache directives for all resources exposed by the
# API. We can always override these global settings later.
CACHE_CONTROL = 'max-age=20'
CACHE_EXPIRES = 20

############################ API DEFINITIONS #############################

data_point = {
    "schema": 
        {
            "geometry": 
                {
                    "type": "dict", 
                    "schema": 
                        {
                        "type": 
                            {
                                "type": "string",
                                "allowed": ["Point"]
                            }, 
                        "coordinates": {
                                "type": "list", 
                                "items": [{"type": "number"}, {"type": "number"}]
                                }
                        }
                },
            "properties":  
                {"type": "dict"},
            "type": 
                {
                    "type": "string",
                    "default": "Feature",
                    "allowed": ["Feature"]
                }
        },
      "datasource": {"default_sort": [("_created", -1)]}
}


# The DOMAIN dict explains which resources will be available and how they will
# be accessible to the API consumer.
DOMAIN = {
    'data_point': data_point,
}
