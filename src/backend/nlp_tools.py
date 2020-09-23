import re
from leia import SentimentIntensityAnalyzer

class NlpTools():
        def __init__(self):
                self.sentiment_analyzer = SentimentIntensityAnalyzer()

        def get_sentiment_polarities(self, text):
                return self.sentiment_analyzer.polarity_scores(text)

        def remove_links(self,text):
                return re.sub(r'http\S+', '', text)

        def decide_polarity(self, polarities):
                greater = ''
                neg = polarities['neg']
                pos = polarities['pos']
                neu = polarities['neu']

                if neg > pos and neg > neu:
                        greater = 'neg'
                elif pos > neg and pos > neu:
                        greater = 'pos'
                elif neu > neg and neu > pos:
                        if neu >=0.95:
                                greater = 'neu'
                        elif pos > neg:
                                greater = 'pos'
                        else:
                                greater = 'neg'
                else: #empates
                        if pos == neu:
                                greater = 'pos'
                        elif neg == neu:
                                greater = 'neg'
                        else:
                                greater = 'neu'
                return greater