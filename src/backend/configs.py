import json
class Configs:
    def __init__(self):
        self.configs = json.load(open('../configs.json'))
    def get_param(self, field):
        return  self.configs[field]