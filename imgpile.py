from flask import Flask, request
import MySQLdb
import json
import re
import base64

DATABASE = 'imgpile'
UPLOADS_LOCAL = 'static/uploads'
UPLOADS_WEB = '/static/uploads'

app = Flask(__name__)
app.config.from_object(__name__)
app.debug = True

# used for development
@app.route('/')
def index():
	return open('static/index.html').read()

@app.route('/api/images', methods = ['GET', 'POST'])
def images():
	db, cursor = connect_db()
	
	# create image
	if request.method == "POST":
		m = re.match(r'data:image/([^;]+);base64,', request.json['src'])
		ext = m.group(1)
		cursor.execute(
			'INSERT INTO image SET name = %s, extension = %s',
			(request.json['name'], ext)
		)
		f = open(
			'%s/%i.%s' % (app.config['UPLOADS_LOCAL'], db.insert_id(), ext), 'w'
		)
		f.write(base64.b64decode(request.json['src'][len(m.group(0)):]))
		f.close()
		db.commit()
	
	# retrieve images
	images = []
	cursor.execute('SELECT id, name, extension, description FROM image')
	for id, name, extension, description in cursor:
		images.append({
			'id': id,
			'src': '%s/%i.%s' % (app.config['UPLOADS_LOCAL'], id, extension),
			'name': name,
			'description': description
		})
	return json.dumps(images)

# get image
@app.route('/api/images/<int:image_id>', methods = ['GET', 'PUT'])
def image(image_id):
	db, cursor = connect_db()
	cursor.execute(
		'SELECT id, name, extension, description FROM image WHERE id = %s',
		(image_id,)
	)
	id, name, extension, description = cursor.fetchone();
	image = {
		'id': id,
		'src': '%s/%i.%s' % (app.config['UPLOADS_LOCAL'], id, extension),
		'name': name,
		'description': description
	}
	
	# update image
	if request.method == "PUT":
		cursor.execute(
			'UPDATE image SET name = %s, description = %s WHERE id = %s',
			(request.json['name'], request.json['description'], image_id)
		)
		db.commit()
		image['name'] = name
		image['description'] = description
	
	return json.dumps(image)

def connect_db():
	connection = MySQLdb.connect(db = app.config['DATABASE'])
	return connection, connection.cursor()

if __name__ == '__main__':
	app.run(host = '0.0.0.0')
