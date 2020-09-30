import React, { useState } from "react";
import 'antd/dist/antd.css';
import axios from 'axios';
import { PageHeader,Form, Button } from 'antd';
import { Input, Checkbox } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};




class Header extends React.Component {

        constructor(props) {
          super(props);
          this.state = { query:'',amount:50};
          this.handleClick = this.handleClick.bind(this);
          this.query = React.createRef()
          this.amount = React.createRef()
        }
        handleClick() {
          this.refreshAmount()
          this.refreshQuery()
          this.makeRequest()
        }

        refreshQuery(){
          this.setState({query:this.query.current.state.value})
        }

        refreshAmount(){
          this.setState({amount:this.amount.current.state.value})
        }

        makeRequest(){
          const q = {'params':{'query_text':this.query.current.state.value,'amount':this.amount.current.state.value}}
          axios.get(`http://127.0.0.1:8080`,q)
            .then(res => {
                  //const res = res.data;
                  this.setState({ tweets:res.data });
            })
            console.log('this.state.tweets')
            console.log(this.state.tweets)
        }

        render() {
          return (
                <div>
                        <Form
                              {...layout}
                              name="basic"
                              initialValues={{
                                remember: true,
                              }}
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                            >
                              <Form.Item
                                label="Query"
                                name="query"
                                rules={[
                                  {
                                    required: true,
                                    message: 'You must specify a search item',
                                  },
                                ]}
                              >
                                <Input placeholder="Ex: Playstation" ref={this.query}/>
                              </Form.Item>
                              <Form.Item
                                label="Amount"
                                name="Amount"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input the amout of tweets.',
                                  },
                                ]}
                              >
                                <Input type="number" ref={this.amount}/>
                              </Form.Item>

                              {/* <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={this.handleClick}>
                                  Search
                                </Button>
                              </Form.Item> */}
                            </Form>
                </div>
          );
        }
      }
export default Header