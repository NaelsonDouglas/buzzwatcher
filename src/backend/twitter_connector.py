import tweepy
import re
import pandas as pd
import numpy as np
import time
from configs import Configs
from nlp_tools import NlpTools
class TwitterConnector(Configs):
        def __init__(self):
                super().__init__()
                consumer_key = self.get_param('consumer_key')
                consumer_secret = self.get_param('consumer_secret')
                access_token = self.get_param('access_token')
                access_token_secret = self.get_param('access_token_secret')
                auth = tweepy.OAuthHandler(consumer_key,consumer_secret)
                auth.set_access_token(access_token,access_token_secret)
                self.api = tweepy.API(auth)

        def query(self, query_text='a',amount=300):
                tweets = []
                meta = []
                cursor = tweepy.Cursor(self.api.search,
                        q=query_text,
                        count=amount,
                        tweet_mode='extended',
                        rpp=amount,
                        result_type='popular',
                        include_entities=True,
                        lang="pt").items(int(amount))
                i = 0
                for tweet in cursor:
                        print(i)
                        i = i+1
                        if 'retweeted_status' in dir(tweet):
                                aux=tweet.retweeted_status.full_text
                        else:
                                aux=tweet.full_text
                        newtweet = aux.replace('\n', ' ')
                        tweets.append(newtweet)
                        meta.append(tweet)
                        time.sleep(0.1)
                return {'tweets':tweets, 'meta':meta}

        def df_from_tweets(self,tweets, meta):
                tweets_df = pd.DataFrame(tweets, columns=['Tweets'])
                #tweets_df['len']  = np.array([len(tweet) for tweet in tweets])
                #tweets_df['ID']   = np.array([tweet.id for tweet in meta])
                #tweets_df['Date'] = np.array([tweet.created_at for tweet in meta])
                #tweets_df['Source'] = np.array([tweet.source for tweet in meta])
                tweets_df['Likes']  = np.array([tweet.favorite_count for tweet in meta])
                tweets_df['RTs']    = np.array([tweet.retweet_count for tweet in meta])
                tweets_df['Avatar'] = np.array([tweet.user._json['profile_image_url'].replace('_normal','') for tweet in meta])
                tweets_df['User'] = np.array([tweet.user._json['name'] for tweet in meta])
                #tweets_df['User Location']    = np.array([tweet.user.location for tweet in meta])
                #tweets_df['Geo']    = np.array([tweet.geo for tweet in meta])
                #tweets_df['Coordinates']  = np.array([tweet.coordinates for tweet in meta])
                return tweets_df