from elasticsearch import Elasticsearch, helpers
import sys, json, time

API_URL = 'http://stream:5000/sentences'
ELASTIC_INDEX = 'sentences'

es = Elasticsearch()
es = Elasticsearch(["elastic"], port=9200)
es.indices.create(index=ELASTIC_INDEX, ignore=400)

## Retrieve JSON results from HTTP stream API
# stream_data = <GET 'http://<api host>:<api port>/sentences'>

## Use elasticsearch.helpers to index the data in elastic
# helpers.bulk(...)
