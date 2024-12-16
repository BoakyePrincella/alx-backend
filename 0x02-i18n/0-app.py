#!/usr/bin/env python3
"""the flask app module"""


from typing import Text
from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)


@app.route('/')
def index() -> Text:
    """return the index page of the app
    """
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
