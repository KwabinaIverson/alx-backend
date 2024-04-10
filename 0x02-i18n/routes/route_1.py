#!/usr/bin/env python3
from flask import Blueprint, render_template

app_routes = Blueprint('app_routes', __name__)

@app_routes.route('/', methods=["GET"], strict_slashes=False)
def index():
    """Route to the home page"""
    return render_template('1-index.html')
