#!/usr/bin/env python3

from flask import Flask
from routes.route_1 import app_routes
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)

class Config:
    """class Config configures languages with babel."""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app.config.from_object(Config)
app.register_blueprint(app_routes)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
