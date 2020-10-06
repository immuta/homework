from random import randint

from essential_generators import DocumentGenerator
from flask import Flask, jsonify
from randomtimestamp import randomtimestamp

app = Flask(__name__)
gen = DocumentGenerator()

@app.route("/paragraphs", methods=["GET"])
def paragraphs():
    resp_arr = []
    resp_len = randint(0,5)
    for i in range(0, resp_len):
        resp = {
            "content": gen.paragraph(),
            "id": gen.guid(),
            "timestamp": randomtimestamp()
        }
        resp_arr.append(resp)
    return jsonify(resp_arr)

@app.route("/sentences", methods=["GET"])
def sentences():
    resp_arr = []
    resp_len = randint(0,5)
    for i in range(0, resp_len):
        resp = {
            "content": gen.sentence(),
            "id": gen.guid(),
            "timestamp": randomtimestamp()
        }
        resp_arr.append(resp)
    return jsonify(resp_arr)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
