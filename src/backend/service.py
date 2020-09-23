from twitter_connector import TwitterConnector
from nlp_tools import NlpTools
import pandas as pd


class Service():
        def __init__(self):
                self.twitter = TwitterConnector()
                self.nlp = NlpTools()
                self.data = pd.DataFrame()

        def query(self, query_text='twitter',amount=10):
                data_dict = self.twitter.query(query_text,amount)
                self.data = self.twitter.df_from_tweets(data_dict['tweets'],data_dict['meta'])
                self.process_sentiments()
                #return self.data.to_dict(orient='records')
                return self.data.to_json(orient='records')
                #return self.data

        def process_sentiments(self):
                for i, row in self.data.iterrows():
                        tweet = row.Tweets
                        tweet = self.nlp.remove_links(tweet)
                        polarities = self.nlp.get_sentiment_polarities(tweet)
                        chosen_polarity = self.nlp.decide_polarity(polarities)
                        self.data.at[i,'sentiment'] = chosen_polarity