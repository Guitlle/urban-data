import os
from eve import Eve
from eve.auth import BasicAuth

class AppAuth(BasicAuth): 
    def check_auth(self, username, password, allowed_roles, resource, method):
	return (username == 'urbanuser' and password == 'urbankey')
        
if __name__ == '__main__':
    # Heroku support: bind to PORT if defined, otherwise default to 5000.
    if 'PORT' in os.environ:
        port = int(os.environ.get('PORT'))
        # use '0.0.0.0' to ensure your REST API is reachable from all your
        # network (and not only your computer).
        host = '0.0.0.0'
    else:
        port = 5000
        #host = '127.0.0.1'
        host = '0.0.0.0'

    app = Eve(auth=AppAuth)
    app.run(host=host, port=port)

