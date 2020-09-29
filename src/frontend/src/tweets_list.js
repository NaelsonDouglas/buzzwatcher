import React from 'react';
import axios from 'axios';
import Tweet from './tweet'
import { List, Avatar, Space } from 'antd';
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
          this.state = { tweets: [], };
        }

        componentDidMount() {
                axios.get(`http://127.0.0.1:8080?query_text=xbox&amount=5`)
                  .then(res => {
                        console.log(res);
                        //const res = res.data;
                        this.setState({ tweets:res.data });
                  })
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
                      <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                      <IconText icon={LikeOutlined} text={item.Likes} key="list-vertical-like-o" />,
                      <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    {/* <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    /> */}
                    {item.Tweets}
                  </List.Item>
                )}
              />
        }


      }
export default TweetsList