import os
import os.path
from fabric.api import *

PATH = os.path.dirname(os.path.abspath(__file__))

# install application dependancies
def install():
	local('sudo apt-get install -y python-pip python-mysqldb mysql-server')
	local('sudo pip install Flask==0.9')
	local('mysql -u root -p -e "GRANT ALL ON *.* TO \'\'@localhost"')
	reset()

# recreate database
def reset():
	local('mysql < src/schema.sql')

# deploy application
def deploy():
	local('sudo apt-get install -y gunicorn nginx')
	
	# create gunicorn configuration
	c = open('src/gunicorn')
	t = open('/tmp/gunicorn-imgpile', 'w')
	t.write(c.read().replace('{{wd}}', PATH))
	c.close()
	t.close()
	p = '/etc/gunicorn.d/imgpile'
	local('sudo cp %s %s' % (t.name, p))
	os.remove(t.name)
	
	# allow uploads
	local('mkdir -p static/uploads')
	local('sudo chown :www-data static/uploads')
	
	# create nginx configuration
	c = open('src/nginx')
	t = open('/tmp/nginx-imgpile', 'w')
	t.write(c.read().replace('{{root}}', PATH))
	c.close()
	t.close()
	p = '/etc/nginx/sites-available/imgpile'
	local('sudo cp %s %s' % (t.name, p))
	l = '/etc/nginx/sites-enabled/imgpile'
	if not os.path.exists(l):
		local('sudo ln -s %s %s' % (p, l))
	os.remove(t.name)
	
	# remove default nginx site
	for e in ('enabled', 'available'):
		local('sudo rm -f /etc/nginx/sites-%s/default' % e)
	
	# restart services
	print ' * Restarting services...'
	for s in ('gunicorn', 'nginx'):
		local('sudo service %s restart' % s)
	
	# open web port
	local('sudo ufw allow "Nginx Full"')
	
