import { Button, Card, Form, Input, message, Space } from 'antd';
import { history, useLocation } from 'umi';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fetchFavorite, saveFavorite } from '@/pages/favorite/FormFavorite/service';
import SelectCode from '@/components/SelectCode';

const FormItem = Form.Item;

const FormFavorite: FC = () => {
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
    const { data, code } = await saveFavorite({ ...values, isRelease, id });
    code === 0 && message.success('操作成功');
    data && history.replace({ pathname: 'form-favorite', query: { id: data as string } });
  };

  const handleFetchArticle = async () => {
    const { data, msg } = await fetchFavorite({ id });
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
            label={'链接'}
            name="link"
            rules={[
              {
                required: true,
                message: '请输入链接',
              },
            ]}
          >
            <Input placeholder={'请输入链接'} />
          </FormItem>
          <FormItem
            label={'分类'}
            name="category"
            rules={[
              {
                required: true,
                message: '请选择分类',
              },
            ]}
          >
            <SelectCode placeholder={'请选择分类'} code={'FAVORITE'} />
          </FormItem>
          <FormItem
            label={'图片'}
            name="img"
            rules={[
              {
                required: true,
                message: '请输入图片',
              },
            ]}
          >
            <Input placeholder={'请输入图片'} />
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
            <Input placeholder={'请输入文章'} />
          </FormItem>
          <FormItem
            label={'备注'}
            name="remark"
            rules={[
              {
                required: true,
                message: '请输入备注',
              },
            ]}
          >
            <Input placeholder={'请输入备注'} />
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Space>
              <Button onClick={() => setIsRelease(true)} type="primary" htmlType="submit">
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

export default FormFavorite;
