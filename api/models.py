from . import db

class Text(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(50))
    content = db.Column(db.String())
    word_count = db.Column(db.Integer)

class Statistics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    registered_users = db.Column(db.Integer)
    texts = db.Column(db.Integer)
    chars_sum = db.Column(db.Integer)
