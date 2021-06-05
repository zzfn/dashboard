import { Button, Card, Form, Input, message, Select } from 'antd';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { sendMsg } from '@/pages/talk/FormTalk/service';

const FormItem = Form.Item;

const FormTalk: FC = () => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = async (values: Record<string, any>) => {
    const { errcode } = await sendMsg(values);
    errcode === 0 && message.success('操作成功');
  };

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          {...formItemLayout}
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          onFinish={onFinish}
        >
          <FormItem label={'消息类型'} name="msgtype">
            <Select placeholder={'选择消息类型'}>
              <Select.Option value="text">文本消息</Select.Option>
              <Select.Option value="link">图文消息</Select.Option>
              <Select.Option value="markdown">markdown消息</Select.Option>
              <Select.Option value="ActionCard">跳转消息</Select.Option>
              <Select.Option value="FeedCard">FeedCard消息</Select.Option>
            </Select>
          </FormItem>
          <Form.Item noStyle shouldUpdate={(prev, next) => prev.msgtype !== next.msgtype}>
            {() =>
              form.getFieldValue('msgtype') === 'text' && (
                <FormItem label={'消息内容'} name={['text', 'content']}>
                  <Input.TextArea placeholder={'输入消息内容'} />
                </FormItem>
              )
            }
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prev, next) => prev.msgtype !== next.msgtype}>
            {() =>
              form.getFieldValue('msgtype') === 'link' && (
                <FormItem label={'消息标题'} name={['link', 'title']}>
                  <Input.TextArea placeholder={'消息标题'} />
                </FormItem>
              )
            }
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prev, next) => prev.msgtype !== next.msgtype}>
            {() =>
              form.getFieldValue('msgtype') === 'link' && (
                <FormItem label={'消息内容'} name={['link', 'text']}>
                  <Input.TextArea placeholder={'消息内容,如果太长只会部分展示'} />
                </FormItem>
              )
            }
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prev, next) => prev.msgtype !== next.msgtype}>
            {() =>
              form.getFieldValue('msgtype') === 'link' && (
                <FormItem label={'图片URL'} name={['link', 'picUrl']}>
                  <Input.TextArea placeholder={'图片URL'} />
                </FormItem>
              )
            }
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prev, next) => prev.msgtype !== next.msgtype}>
            {() =>
              form.getFieldValue('msgtype') === 'link' && (
                <FormItem label={'消息链接'} name={['link', 'messageUrl']}>
                  <Input.TextArea placeholder={'点击消息跳转的URL'} />
                </FormItem>
              )
            }
          </Form.Item>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{ marginLeft: 8 }}>重置</Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default FormTalk;
