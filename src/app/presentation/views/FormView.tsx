import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useState, useEffect, SetStateAction } from "react";

import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useTranslation } from "react-i18next";
import moment from "moment";

const FormView = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("crudData") || "[]") || []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [citizenID, setCitizenID] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
    part5: "",
  });

  useEffect(() => {
    localStorage.setItem("crudData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    form.resetFields();
  }, [editingRecord]);

  const resetField = () => {
    setEditingRecord(null);
  };

  const handleSave = (values: any) => {
    if (editingRecord) {
      const newData = data.map((item: { key: any }) =>
        item.key === editingRecord.key ? { ...item, ...values } : item
      );
      setData(newData);
      setEditingRecord(null);
    } else {
      const newData = [...data, { key: Date.now().toString(), ...values }];
      setData(newData);
    }
  };

  const handleDeleteSelected = () => {
    const newData = data.filter(
      (item: { key: any }) => !selectedRowKeys.includes(item.key)
    );
    setData(newData);
    setSelectedRowKeys([]); // Clear selection after deletion
  };

  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map((item: { key: any }) => item.key));
    }
  };

  const handleEdit = (record: SetStateAction<null>) => {
    form.setFieldsValue({ ...record, birthday: moment(record?.birthday) });

    setEditingRecord({ ...record, birthday: moment(record?.birthday) });
  };

  const handleDelete = (key: any) => {
    const newData = data.filter((item: { key: any }) => item.key !== key);
    setData(newData);
  };

  const handleRowSelection = (key: any) => {
    const newSelectedRowKeys = [...selectedRowKeys];
    const index = newSelectedRowKeys.indexOf(key);
    if (index >= 0) {
      newSelectedRowKeys.splice(index, 1);
    } else {
      newSelectedRowKeys.push(key);
    }
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: (
        <Checkbox
          onChange={handleSelectAll}
          checked={selectedRowKeys.length === data.length}
        />
      ),
      dataIndex: "select",
      render: (_: any, record: { key: any }) => (
        <Checkbox
          onChange={() => handleRowSelection(record.key)}
          checked={selectedRowKeys.includes(record.key)}
        />
      ),
    },
    {
      title: t("formAndTable.form.fullName"),
      dataIndex: "fullname",
      key: "fullname",
      render: (_: any, record: { firstname: string; lastname: string }) => (
        <Space size="middle">
          {record.firstname} {record.lastname}
        </Space>
      ),
    },
    {
      title: t("formAndTable.form.gender.title"),
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: t("formAndTable.form.mobilePhone"),
      dataIndex: "mobilePhone",
      key: "mobilePhone",
    },
    {
      title: t("formAndTable.form.nationality"),
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: t("formAndTable.form.manage"),
      key: "manage",
      render: (_: any, record: { key: any }) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>
            {t("formAndTable.form.edit")}
          </Button>
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button>{t("formAndTable.form.delete")}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const SlashComponent = () => {
    return (
      <Col
        span={1}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        -
      </Col>
    );
  };

  const FormRegister = () => {
    return (
      <div className="form-register-layout">
        <Form
          form={form}
          onFinish={handleSave}
          initialValues={
            editingRecord || {
              title: "",
              firstname: "",
              lastname: "",
              birthday: "",
              nationality: "",
              citizenId: [],
              gender: "",
              mobilePhoneRegion: "",
              mobilePhone: "",
              passportNo: "",
              expectedSalary: "",
            }
          }
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row gutter={8}>
            <Col xs={6}>
              <Form.Item
                label={t("formAndTable.form.title")}
                name="title"
                rules={[{ required: true, message: "Please select a title!" }]}
              >
                <Select>
                  <Option value="Mr.">Mr.</Option>
                  <Option value="Mrs.">Mrs.</Option>
                  <Option value="Mrs.">Ms.</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={9}>
              <Form.Item
                label={t("formAndTable.form.firstName")}
                name="firstname"
                rules={[
                  { required: true, message: "Please enter the Firstname!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={9}>
              <Form.Item
                label={t("formAndTable.form.lastName")}
                name="lastname"
                rules={[
                  { required: true, message: "Please enter the Lastname!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={7}>
              <Form.Item
                label={t("formAndTable.form.birthday")}
                name="birthday"
                rules={[
                  { required: true, message: "Please select a birthday!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={9}>
              <Form.Item
                label={t("formAndTable.form.nationality")}
                name="nationality"
                rules={[
                  { required: true, message: "Please select a nationality!" },
                ]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value="Thailand">Thailand</Select.Option>
                  <Select.Option value="French">French</Select.Option>
                  <Select.Option value="American">American</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={22}>
              <Form.Item
                label={t("formAndTable.form.citizenID")}
                style={{ height: 32 }}
              >
                <Row gutter={8} style={{ width: "100%" }}>
                  <Col span={3}>
                    <Form.Item name="citizenId">
                      <Input
                        maxLength={1}
                        placeholder=""
                        style={{ textAlign: "center" }}
                      />
                    </Form.Item>
                  </Col>
                  <SlashComponent />
                  <Col span={5}>
                    <Form.Item name="citizenId[1]">
                      <Input
                        maxLength={4}
                        placeholder=""
                        style={{ textAlign: "center" }}
                      />
                    </Form.Item>
                  </Col>
                  <SlashComponent />
                  <Col span={5}>
                    <Form.Item name="citizenId[2]">
                      <Input
                        maxLength={5}
                        placeholder=""
                        style={{ textAlign: "center" }}
                      />
                    </Form.Item>
                  </Col>
                  <SlashComponent />
                  <Col span={3}>
                    <Form.Item name="citizenId[3]">
                      <Input
                        maxLength={2}
                        placeholder=""
                        style={{ textAlign: "center" }}
                      />
                    </Form.Item>
                  </Col>
                  <SlashComponent />
                  <Col span={3}>
                    <Form.Item name="citizenID[4]">
                      <Input
                        maxLength={1}
                        placeholder=""
                        style={{ textAlign: "center" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item
              label={t("formAndTable.form.gender.title")}
              name="gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Radio.Group>
                <Radio value="male">{t("formAndTable.form.gender.male")}</Radio>
                <Radio value="female">
                  {t("formAndTable.form.gender.female")}
                </Radio>
                <Radio value="unsex">
                  {t("formAndTable.form.gender.unsex")}
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Row gutter={8}>
            <Col span={10}>
              <Form.Item
                label={t("formAndTable.form.mobilePhone")}
                name="mobilePhoneRegion"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select style={{ width: "100%" }}>
                  <Option value="+66">🇹🇭 +66 (Thailand)</Option>
                  <Option value="+1">🇺🇸 +1 (USA)</Option>
                  <Option value="+44">🇬🇧 +44 (UK)</Option>
                </Select>
              </Form.Item>
            </Col>
            <SlashComponent />
            <Col span={12}>
              <Form.Item
                name="mobilePhone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter your phone number"
                  maxLength={10}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="passportNo"
                label={t("formAndTable.form.passportNo")}
              >
                <Input
                  // value={phoneNumber}
                  // onChange={handlePhoneNumberChange}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="expectedSalary"
                label={t("formAndTable.form.expectedSalary")}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={3}></Col>
            <Col span={3}>
              <Button onClick={() => resetField()}>
                {t("formAndTable.form.reset")}
              </Button>
            </Col>
            <Col span={3}>
              <Button htmlType="submit">{t("formAndTable.form.submit")}</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  const TableSection = () => {
    return (
      <>
        <div style={{ width: "100%", marginTop: 20 }}>
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedRowKeys.length === data.length}
          >
            {t("formAndTable.form.selectAll")}
          </Checkbox>
          <Button onClick={handleDeleteSelected} style={{ marginLeft: 10 }}>
            {t("formAndTable.form.delete")}
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="key"
          style={{ marginTop: 0, width: 1200 }}
          pagination={{
            position: ["topRight"],
            showQuickJumper: true,
            prevIcon: <div>{t("formAndTable.form.prev")}</div>,
            nextIcon: <div>{t("formAndTable.form.next")}</div>,
          }}
        />
      </>
    );
  };

  return (
    <div className="form-screen-layout">
      <FormRegister></FormRegister>
      <TableSection></TableSection>
    </div>
  );
};
export default FormView;
