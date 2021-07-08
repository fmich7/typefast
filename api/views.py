from flask import Blueprint, json, jsonify, request
from sqlalchemy.util.langhelpers import methods_equivalent
from . import db
from .models import Text, Statistics
from random import randrange

main = Blueprint('main', __name__)

@main.route('/add_text', methods=['POST'])
def add_text():
    text_data = request.get_json()
    new_text = Text(author=text_data['author'], content=text_data['content'], word_count=len(text_data['content'].split()))

    website_statistics = Statistics.query.all()[0]
    website_statistics.texts += 1
    website_statistics.chars_sum += len(text_data['content'])

    db.session.add(new_text)
    db.session.commit()

    return 'Done', 201

@main.route('/add_user', methods=['PUT'])
def add_user():
    #add auth etc
    website_statistics = Statistics.query.all()[0]
    website_statistics.registered_users += 1;
    db.session.commit()

    return 'Done', 201

@main.route('/get_all_texts', methods=['GET'])
def get_all_texts():
    text_list = Text.query.all()
    texts = list()

    for text in text_list:
        texts.append({'author': text.author, 'content': text.content, 'word_count': text.word_count})

    return jsonify({'texts': texts})

@main.route('/get_rand_text', methods=['GET'])
def get_rand_text():
    #optymalizacja tego
    text_list = Text.query.all()
    text = text_list[randrange(len(text_list))]
    text = {'author': text.author, 'content': text.content, 'word_count': text.word_count}
    
    return jsonify({'texts': text})
@main.route('/get_website_statistics', methods=['GET'])
def get_website_statistics():
    website_statistics = Statistics.query.all()[0]
    return jsonify({
        'registered_users': website_statistics.registered_users, 
        'texts': website_statistics.texts, 
        'chars_sum': website_statistics.chars_sum
        })
