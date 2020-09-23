class Colors:
    def __init__(self):
        self.current = 0
        self.colors = ['\033[95m', '\033[94m', '\033[92m', '\033[93m', '\033[91m', '\033[0m', '\033[1m', '\033[4m']

    def get_next(self):
        if self.current + 1 > len(self.colors)-1:
            self.current = 0
            return self.colors[self.current]
        else:
            self.current = self.current + 1
            return self.colors[self.current - 1]