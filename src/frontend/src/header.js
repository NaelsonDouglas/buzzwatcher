import React, { useState } from "react";
import 'antd/dist/antd.css';
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
          this.state = { isToggleOn: true };
          this.handleClick = this.handleClick.bind(this);
        }
        handleClick() {
          this.setState(state => ({
            isToggleOn: !state.isToggleOn
          }));
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
                                <Input placeholder="Ex: Playstation" />
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
                                <Input type="number" />
                              </Form.Item>

                              <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                  Search
                                </Button>
                              </Form.Item>
                            </Form>
                </div>
          );
        }
      }
export default Header