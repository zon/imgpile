from flask import Flask, request
import MySQLdb
import json

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
		cursor.execute(
			'INSERT INTO image SET name = %s, path = %s',
			(request.json['name'], 'fake.png')
		)
	db.commit()
	
	# retrieve images
	images = []
	cursor.execute('SELECT id, path, name, description FROM image')
	for id, path, name, description in cursor:
		images.append({
			'id': id,
			'src': app.config['UPLOADS_WEB'] +'/'+ path, 
			'name': name,
			'description': description
		})
	return json.dumps(images)

# get image
@app.route("/api/images/<int:image_id>")
def image(image_id):
	db, cursor = connect_db()
	cursor.execute(
		'SELECT id, path, name, description FROM image WHERE id = %s',
		(image_id,)
	)
	id, path, name, description = cursor.fetchone();
	image = {'id': id, 'path': path, 'name': name, 'description': description}
	
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
