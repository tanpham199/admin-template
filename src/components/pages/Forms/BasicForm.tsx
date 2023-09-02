import { UNEXPECTED_ERROR_TEXT } from '@/constants';
import { Button, Form, Input, Select, message, App, Checkbox, Radio } from 'antd';
import { useState } from 'react';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
  gender: Gender.Male,
  subscribeToUpdates: true,
};

type FieldType = typeof initialValues;

const Item = Form.Item<FieldType>;
const { Option } = Select;

const BasicForm = () => {
  const { modal } = App.useApp();
  const [loading, setLoading] = useState<boolean>(false);

  const submitPromise = (values: FieldType) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        const { confirmPassword, ...submitValues } = values;
        modal.success({
          title: 'Submitted the following values',
          content: JSON.stringify(submitValues),
          maskClosable: true,
        });
        resolve();
      }, 1000);
    });

  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    try {
      await submitPromise(values);
    } catch (error) {
      console.error(error);
      message.error(UNEXPECTED_ERROR_TEXT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="basic" layout="vertical" onFinish={handleSubmit} initialValues={initialValues}>
      <Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Item>
      <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Item>
      <Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Passwords do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Item>
      <Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Select allowClear>
          {Object.entries(Gender).map(([label, value]) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Item>
      <Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Radio.Group>
          {Object.entries(Gender).map(([label, value]) => (
            <Radio.Button key={value} value={value}>
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Item>
      <Item name="subscribeToUpdates" valuePropName="checked">
        <Checkbox>Subscribe to receive the latest updates and news via email.</Checkbox>
      </Item>
      <Item noStyle>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Submit
        </Button>
      </Item>
    </Form>
  );
};

export default BasicForm;
