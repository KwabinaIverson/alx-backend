#!/usr/bin/env python3
"""Flask"""
from flask import Flask, request
from routes.route_4 import app_routes
from flask_babel import Babel
from config import Config
from typing import Union


app = Flask(__name__)
babel = Babel(app)

class Config:
    """class Config configures languages with babel."""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

app.config.from_object(Config)
app.register_blueprint(app_routes)

@babel.localeselector
def get_locale() -> Union[str, None]:
    """Get Locale of a request and match it to a language"""
    locale = request.args.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale
    return request.accept_languages.best_match(Config.LANGUAGES)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
