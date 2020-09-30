import React from 'react';
import axios from 'axios';
import SentimentButton from './sentiment_button'
import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const single_tweet = {
        "Tweets": "Precisa desenhASDASDar? Bolsonaro quer eleger Russomano e acionou a PF pra tentar me intimidar. O medo deles do nosso crescimento só mostra que estamos no caminho certo. São Paulo vai ser a capital da resistência! https://t.co/GlFUkWraOI",
        "Likes": 19535,
        "sentiment": "pos"
      }
const sample = [single_tweet, single_tweet, single_tweet]

const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );

class TweetsList extends React.Component {
        constructor(props) {
          super(props);
          this.state = { tweets: [], query:'test',amount:10 };
        }

        updateList(props) {
          this.setState({tweets:props.tweets});
        }

        componentDidMount() {
                axios.get(`http://127.0.0.1:8080?query_text=bolsonaro&amount=5`)
                  .then(res => {
                        console.log(this.state.tweets);
                        //const res = res.data;
                        //this.setState({ tweets:res.data });
                  })
              }
        makeRequest(props){
          //const q = {'query_text':props.query_text,'amount':props.amount}
          console.log(props)
          const q = {'params':{'query_text':props.query,'amount':props.amount}}
          axios.get(`http://127.0.0.1:8080`,q)
            .then(res => {
                  //const res = res.data;
                  this.setState({ tweets:res.data });
            })
        }

        setTweets(props){
          this.setState({tweets:props.tweets})
        }

        render() {
                return <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.tweets}
                renderItem={item => (
                  <List.Item
                    key={item.Tweets}
                    actions={[
                      // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                      <IconText icon={LikeOutlined} text={item.Likes} key="list-vertical-like-o" />,
                      // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        src = {item.Avatar}
                      />
                    }
                  >
                    <SentimentButton sentiment={item.sentiment}></SentimentButton>
                    <div>
                      {item.User}
                    </div>
                    {item.Tweets}
                  </List.Item>
                )}
              />
        }


      }
export default TweetsList