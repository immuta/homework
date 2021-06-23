############################################################################
#                                                                          #
#  oooooooooo.                         o8o     .                           #
#  `888'   `Y8b                        `YP   .o8                           #
#   888      888  .ooooo.  ooo. .oo.    '  .o888oo                         #
#   888      888 d88' `88b `888P"Y88b        888                           #
#   888      888 888   888  888   888        888                           #
#   888     d88' 888   888  888   888        888 .                         #
#  o888bood8P'   `Y8bod8P' o888o o888o       "888"                         #
#                                                                          #
#                  .o8   o8o      .                                    .o. #
#                 "888   `"'    .o8                                    888 #
#   .ooooo.   .oooo888  oooo  .o888oo      ooo. .oo.  .oo.    .ooooo.  888 #
#  d88' `88b d88' `888  `888    888        `888P"Y88bP"Y88b  d88' `88b Y8P #
#  888ooo888 888   888   888    888         888   888   888  888ooo888 `8' #
#  888    .o 888   888   888    888 .       888   888   888  888    .o .o. #
#  `Y8bod8P' `Y8bod88P" o888o   "888"      o888o o888o o888o `Y8bod8P' Y8P #
#                                                                          #
#                                                                          #
#                                           That's not allowed :-)         #
#                                                                          #
############################################################################
import json
import logging

from flask import Flask, jsonify, make_response, request
from flask_limiter import HEADERS, Limiter
from flask_limiter.util import get_remote_address
from gevent.pywsgi import WSGIServer


app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["50 per 1 seconds"],
    default_limits_deduct_when=lambda r: r.status_code == 200,
    headers_enabled=True,
)


def get_db():
    with open("./db.json", "r") as buffer:
        db_str = buffer.read()
    return json.loads(db_str)


db = get_db()


@app.errorhandler(429)
def rate_limit_handler(e):
    return make_response(jsonify(error=f"Rate limit exceeded: {e.description}"), 429)


@app.route("/rest/v2/all")
def get_all():
    return jsonify(list(db.keys()))


@app.route("/rest/v2", defaults={"path": ""})
@app.route("/rest/v2/<country_code>")
def get(country_code):
    if not country_code or len(country_code) != 2:
        return jsonify(error="Invalid ISO Alpha 2 country code in the request"), 400
    res = db.get(country_code)
    if not res:
        return jsonify(error=f"ISO Alpha 2 country code '{country_code}' was not found"), 404
    return jsonify(res)


if __name__ == "__main__":
    port = 5001
    logging.basicConfig(level="INFO")
    http_server = WSGIServer(("", port), app, log=app.logger)
    app.logger.info("REST API server listening to port %s", port)
    http_server.serve_forever()
