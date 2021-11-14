import { Button, Card, Form, Input, message, Space } from 'antd';
import { useLocation, history } from 'umi';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import SelectCode from '@/components/SelectCode';
import Markdown from '@/components/Markdown';
import { fetchArticle, saveArticle } from '@/pages/article/FormArticle/service';

const FormItem = Form.Item;

type FormArticleProps = {
  submitting: boolean;
};

const FormArticle: FC<FormArticleProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const location = useLocation();

  const { id } = (location as any).query;
  const [isRelease, setIsRelease] = useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 22 },
      md: { span: 22 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 11 },
      sm: { span: 10, offset: 11 },
    },
  };

  const onFinish = async (values: Record<string, any>): Promise<void> => {
    const { data } = await saveArticle({ ...values, isRelease, id });
    data && message.success('操作成功');
    data && history.replace({ pathname: 'form-article', query: { id: data as string } });
  };

  const handleFetchArticle = async () => {
    const { data, msg } = await fetchArticle({ id });
    if (msg === 'success') {
      form.setFieldsValue(data);
    } else {
      message.error('未知错误');
    }
  };
  useEffect(() => {
    id && handleFetchArticle().then();
  }, [id]);
  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          {...formItemLayout}
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <FormItem
            label={'标题'}
            name="title"
            rules={[
              {
                required: true,
                message: '88',
              },
            ]}
          >
            <Input placeholder={'请输入标题'} />
          </FormItem>
          <FormItem
            label={'标签'}
            name="tag"
            rules={[
              {
                required: true,
                message: '请选择标签',
              },
            ]}
          >
            <SelectCode placeholder={'请选择标签'} code={'TAG'} />
          </FormItem>
          <FormItem
            label={'排序号'}
            name="orderNum"
            rules={[
              {
                required: true,
                message: '请输入排序号',
              },
            ]}
          >
            <Input placeholder={'请输入排序号'} />
          </FormItem>
          <FormItem
            label={'文章'}
            name="content"
            rules={[
              {
                required: true,
                message: '请选择标签',
              },
            ]}
          >
            <Markdown />
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Space>
              <Button
                onClick={() => setIsRelease(true)}
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                发布
              </Button>
              <Button onClick={() => setIsRelease(false)} htmlType="submit">
                保存
              </Button>
            </Space>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default FormArticle;
