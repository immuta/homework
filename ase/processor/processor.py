from elasticsearch import Elasticsearch, helpers
import sys, json, time
from urllib.request import Request, urlopen

API_URL = 'http://stream:5000/sentences'

es = Elasticsearch([{'host': 'elastic', 'port': 9200}])
es.indices.create(index='sentences', ignore=400)

while True:
    req = Request(API_URL)
    with urlopen(req) as response:
        res_code = response.code
        res_data = json.loads(response.read())
        print(res_data)
        helpers.bulk(es, res_data, index='sentences')
    time.sleep(5)
