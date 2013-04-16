from fabric.api import *

def install():
	local('sudo apt-get install -y python-pip')
	local('sudo pip install Flask==0.9')
