from fabric.api import *

# install application dependancies
def install():
	local('sudo apt-get install -y python-pip python-mysqldb mysql-server')
	local('sudo pip install Flask==0.9')
	local('mysql -u root -p -e "GRANT ALL ON *.* TO \'\'@localhost"')
	reset()

# recreate database
def reset():
	local('mysql < src/schema.sql')
