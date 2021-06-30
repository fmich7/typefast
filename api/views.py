from flask import Blueprint, json, jsonify, request
from . import db
from .models import Text
from random import randrange

main = Blueprint('main', __name__)

@main.route('/add_text', methods=['POST'])
def add_text():
    text_data = request.get_json()

    new_text = Text(title=text_data['title'], content=text_data['content'], word_count=len(text_data['content'].split()))

    db.session.add(new_text)
    db.session.commit()

    return 'Done', 201

@main.route('/get_all_texts', methods=['GET'])
def get_all_texts():
    text_list = Text.query.all()
    texts = list()

    for text in text_list:
        texts.append({'title': text.title, 'content': text.content, 'word_count': text.word_count})

    return jsonify({'texts': texts})

@main.route('/get_rand_text', methods=['GET'])
def get_rand_text():
    #optymalizacja tego
    text_list = Text.query.all()
    text = text_list[randrange(len(text_list))]
    text = {'title': text.title, 'content': text.content, 'word_count': text.word_count}
    
    return jsonify({'texts': text})