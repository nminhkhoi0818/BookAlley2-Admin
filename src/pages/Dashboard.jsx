import React, { useEffect, useRef, useState } from "react";
import { Form, Input, InputNumber, Space, Divider, Row, Col } from "antd";

import { Layout, Breadcrumb, Statistic, Progress, Tag } from "antd";

import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import axios from "axios";
import { DashboardLayout } from "@/layout";
import RecentTable from "@/components/RecentTable";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "@/config/serverApiConfig";
import { token as tokenCookies } from "@/auth";

const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <Col className="gutter-row" span={6}>
      <div
        className="whiteBox shadow"
        style={{ color: "#595959", fontSize: 13, height: "106px" }}
      >
        <div
          className="pad15 strong"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <h3 style={{ color: "#22075e", marginBottom: 0 }}>{title}</h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]}>
            <Col className="gutter-row" span={11} style={{ textAlign: "left" }}>
              <div className="left">{prefix}</div>
            </Col>
            <Col className="gutter-row" span={2}>
              <Divider
                style={{ padding: "10px 0", justifyContent: "center" }}
                type="vertical"
              ></Divider>
            </Col>
            <Col
              className="gutter-row"
              span={11}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Tag
                color={tagColor}
                style={{ margin: "0 auto", justifyContent: "center" }}
              >
                {tagContent}
              </Tag>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};
const PreviewState = ({ tag, color, value }) => {
  let colorCode = "#000";
  switch (color) {
    case "bleu":
      colorCode = "#1890ff";
      break;
    case "green":
      colorCode = "#95de64";
      break;
    case "red":
      colorCode = "#ff4d4f";
      break;
    case "orange":
      colorCode = "#ffa940";
      break;
    case "purple":
      colorCode = "#722ed1";
      break;
    case "grey":
      colorCode = "#595959";
      break;
    case "cyan":
      colorCode = "#13c2c2";
      break;
    case "brown":
      colorCode = "#614700";
      break;
    default:
      break;
  }
  return (
    <div style={{ color: "#595959", marginBottom: 5 }}>
      <div className="left alignLeft">{tag}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          "0%": colorCode,
          "100%": colorCode,
        }}
      />
    </div>
  );
};
export default function Dashboard() {
  const [statisticData, setStatisticData] = useState({});
  const headersInstance = {
    [ACCESS_TOKEN_NAME]: `Bearer ${tokenCookies.get()}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API_BASE_URL + "order/statistic", {
        headers: headersInstance,
      });
      setStatisticData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  const orderColumns = [
    {
      title: "Client",
      dataIndex: ["owner", "email"],
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = "orange";
        if (status === "delivering") {
          color = "cyan";
        } else if (status === "completed") {
          color = "green";
        } else if (status === "canceled") {
          color = "red";
        }
        // let color = status === 'pending' ? 'volcano' : 'green';

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "name",
      width: 260,
      ellipsis: true,
    },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "instock",
      render: (instock) => {
        let color = instock != 0 ? "green" : "volcano";

        return <Tag color={color}>{instock}</Tag>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <Row
        gutter={[24, 24]}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <TopCard
          title={"Order"}
          tagColor={"purple"}
          prefix={"This month"}
          tagContent={statisticData.orderCount}
        />
        <TopCard
          title={"Payment"}
          tagColor={"green"}
          prefix={"This month"}
          tagContent={`${statisticData.totalPayment} VND`}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={18}>
          <div className="whiteBox shadow" style={{ height: "280px" }}>
            <Row className="pad10" gutter={[0, 0]}>
              <Col className="gutter-row" span={8}>
                {" "}
                <div className="pad15">
                  <h3 style={{ color: "#22075e", marginBottom: 15 }}>
                    Order Status
                  </h3>
                  {statisticData.groupByStatus && (
                    <>
                      <PreviewState
                        tag={"Pending"}
                        color={"bleu"}
                        value={statisticData.groupByStatus.pending}
                      />
                      <PreviewState
                        tag={"Delivering"}
                        color={"orange"}
                        value={statisticData.groupByStatus.delivering}
                      />
                      <PreviewState
                        tag={"Completed"}
                        color={"red"}
                        value={statisticData.groupByStatus.completed}
                      />
                      <PreviewState
                        tag={"Canceled"}
                        color={"red"}
                        value={statisticData.groupByStatus.canceled}
                      />
                    </>
                  )}
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="pad15">
                  <h3 style={{ color: "#22075e", marginBottom: 15 }}>
                    Order Shipping Method
                  </h3>
                  {statisticData.groupByShippingMethod && (
                    <>
                      <PreviewState
                        tag={"Same-day delivery"}
                        color={"grey"}
                        value={
                          statisticData.groupByShippingMethod[
                            "Same-day delivery"
                          ]
                        }
                      />
                      <PreviewState
                        tag={"Overnight delivery"}
                        color={"bleu"}
                        value={
                          statisticData.groupByShippingMethod[
                            "Overnight delivery"
                          ]
                        }
                      />
                      <PreviewState
                        tag={"International delivery"}
                        color={"orange"}
                        value={
                          statisticData.groupByShippingMethod[
                            "International delivery"
                          ]
                        }
                      />
                      <PreviewState
                        tag={"Normal delivery"}
                        color={"red"}
                        value={
                          statisticData.groupByShippingMethod["Normal delivery"]
                        }
                      />
                    </>
                  )}
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="pad15">
                  <h3 style={{ color: "#22075e", marginBottom: 15 }}>
                    Payment Method
                  </h3>
                  {statisticData.groupByPaymentMethod && (
                    <>
                      <PreviewState
                        tag={"In cash"}
                        color={"grey"}
                        value={statisticData.groupByPaymentMethod["In cash"]}
                      />
                      <PreviewState
                        tag={"Paypal"}
                        color={"bleu"}
                        value={statisticData.groupByPaymentMethod["Paypal"]}
                      />
                      <PreviewState
                        tag={"Momo"}
                        color={"orange"}
                        value={statisticData.groupByPaymentMethod["Momo"]}
                      />
                      <PreviewState
                        tag={"Internet Banking"}
                        color={"red"}
                        value={
                          statisticData.groupByPaymentMethod["Internet Banking"]
                        }
                      />
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col className="gutter-row" span={6}>
          <div className="whiteBox shadow" style={{ height: "280px" }}>
            <div
              className="pad20"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                Customer Preview
              </h3>

              <Progress
                type="dashboard"
                percent={statisticData.userLastMonth}
                width={148}
              />
              <p>New Customer this Month</p>
            </div>
          </div>
        </Col>
      </Row>

      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Recent Orders
              </h3>
            </div>

            <RecentTable entity={"order"} dataTableColumns={orderColumns} />
          </div>
        </Col>

        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Recent Products
              </h3>
            </div>
            <RecentTable entity={"book"} dataTableColumns={productColumns} />
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
