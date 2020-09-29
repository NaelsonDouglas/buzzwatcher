import cherrypy
import cherrypy_cors
import os
import json
from service import Service

class Api:
        def __init__(self):
                cherrypy.response.headers['Content-Type'] = 'application/json'
                cherrypy_cors.install()
                self.service = Service()

        @cherrypy.expose
        def index(self,query_text,amount):
                result = self.service.query(query_text,amount)
                return result


configs = os.path.join(os.path.dirname(__file__), 'cherrypy.conf')
if __name__ == '__main__':
        #breakpoint()
        configs = {
            '/': {
                'cors.expose.on': True,
            },
        }
        cherrypy.quickstart(Api(), config=configs)

Api()