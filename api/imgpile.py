from flask import Flask
import json

ARCHIVE_JSON = '/tmp/imgpile/json'
ARCHIVE_IMAGES = '/tmp/imgpile/images'

AUTO_INCREMENT = 0

app = Flask(__name__)

@app.route('/')
def test():
	return 'Yo'

@app.route("/api/image")
def index():
	if request.method == "POST":
		AUTO_INCREMENT += 1
		id = AUTO_INCREMENT
		name = request.form['name']
		f = open('%s/%s.js' % (ARCHIVE_JSON, id), 'w')
		json = {'id': id, 'name': name}
		text = json.dumps(json)
		f.write(text)
		f.save()
		return text
	
	elif request.method == "PUT":
		id = request.form['id']
		f = open('%s/%s.js' % (ARCHIVE_JSON, id), 'w')
		json = {'id': id, 'name': request.form['name'], 'description': request.form['description']}
		text = json.dumps(json)
		f.write(text)
		return text

if __name__ == '__main__':
	app.run(host = '0.0.0.0')
