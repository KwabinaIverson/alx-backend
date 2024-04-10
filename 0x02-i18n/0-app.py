#!/usr/bin/env python3

from flask import Flask
from routes.route_0 import app_routes

app = Flask(__name__)

app.register_blueprint(app_routes)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
