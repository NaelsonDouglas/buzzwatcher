import json
import datetime
from statistics import Statistics
class Context:
    def __init__(self):
        from pymongo import MongoClient, ASCENDING, DESCENDING
        #configurations = json.load(open('../configs.json'))
        #self.client = MongoClient(configurations['database_ip'], int(configurations['database_port']))
        self.client = MongoClient('mongodb+srv://naelsondouglas:170693@amz.78nuw.gcp.mongodb.net/test?retryWrites=true&w=majority')
        self.db = self.client['amazon']
        #self.db['products'].drop()
        self.products = self.db['products']
        self.statistics = Statistics()
        self.products.create_index([('parsed_name', DESCENDING), ('code', ASCENDING)],unique=True)
        self.categories = self.db['categories']
        self.categories.create_index('category',unique=True)
        #self.matches = self.db['Matches'].create_index(('match_id'), unique = True)
        #self.heroes = self.db['Heroes'].create_index('id')

    def insert_one(self, data, subcollection):
        self.db[subcollection].insert_one(data)

    def get_categories(self):
        result = self.categories.find({})
        print(result)
        return list(result)

    def update_many(self, data_list, subcollection,pk):    #That's a lame approach
        for i in data_list:
            self.db[subcollection].find_one_and_replace({pk:data_list[pk]},i,upsert=True)

    def filter(self,query):
        print(query)
        result = self.products.find(query,{'_id': False}).sort("temperature",-1)
        #print(result)
        result = list(result)
        #self.update_on_list(result) #Get, make sure if the results areup to date and return then.
        result = self.products.find(query,{'_id': False}).sort("temperature",-1)
        result = list(result)
        #print(result)
        return result

    def update_on_list(self,deals):
        for deal in deals:
            fresh_statistics = self.statistics.calc_current_status(deal['price_history'])
            if deal['temperature'] != fresh_statistics['temperature']:
                temperature = fresh_statistics['temperature']
                fresh_statistics.pop('temperature')
                self.products.update_one({'parsed_name':deal['parsed_name'],'code':deal['code']}, {'$set':{'statistics':fresh_statistics,'temperature':temperature}})



    def insert_time_entry(self, data, subcollection):
            doc = self.products.find({'parsed_name':data['parsed_name'],'code':data['code']})
            if doc.count() == 0:
                empty_statistics = self.statistics.calc_current_status(None)
                new_entry = {}
                for k in data.keys():
                    new_entry[k] = data[k]
                new_entry['temperature'] = empty_statistics['temperature']
                empty_statistics.pop('temperature')
                new_entry['statistics'] = empty_statistics
                self.products.insert_one(new_entry) #Adds an empty statistics dictionary
            prices = list(doc)
            prices = prices[0]['price_history']#At this point, data contains only a single entry of price | [date, price]
            if len(prices)>0:
                statistics = self.statistics.calc_current_status(prices)
                last_saved_price = prices[len(prices) - 1][1]
                if last_saved_price == data['price_history'][0][1]: #Abort if there was no price change at all
                    return None
            if len(data['price_history']) > 0:
                timestamp = data['price_history'][0][0]
                price = data['price_history'][0][1]
                price_history = [timestamp,float(price)]
                statistics['last'] = price_history[len(price_history)-1]
                temperature = statistics['temperature']
                if temperature == None:
                    temperature = -999
                statistics.pop('temperature')
                self.products.update_one({'parsed_name':data['parsed_name'],'code':data['code']}, {'$push': {'price_history':price_history}, '$set':{'statistics':statistics,'temperature':temperature}})
                return temperature