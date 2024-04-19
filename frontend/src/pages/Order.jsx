import React from "react";

import CrudModule from "@/modules/CrudModule";
import LeadForm from "@/forms/LeadForm";
import { Tag } from 'antd';
function Order() {
  const entity = "order";
  const searchConfig = {
    displayLabels: ['client'],
    searchFields: 'username,email',
    outputValue: '_id'
  };

  const panelTitle = "Order Panel";
  const dataTableTitle = "Orders Lists";
  const entityDisplayLabels = ["_id"];

  const readColumns = [
    {
      title: 'Email',
      dataIndex: 'owner.email'
    },
    {
      title: 'Username',
      dataIndex: 'owner.username'
    },
    {
      title: 'Shipping Method',
      dataIndex: 'shipping_method'
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method'
    },
    {
      title: 'Total',
      dataIndex: 'total'
    }
  ];
  const dataTableColumns = [
    {
      title: 'Email',
      dataIndex: ['owner', 'email']
    },
    {
      title: 'Username',
      dataIndex: ['owner', 'username']
    },
    {
      title: 'Total',
      dataIndex: 'total'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color = 'orange';
        if (status === 'delivering') {
          color = 'cyan';
        } else if (status === 'completed') {
          color = 'green';
        } else if (status === 'canceled') {
          color = 'red';
        }
        // let color = status === 'pending' ? 'volcano' : 'green';

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    }
  ];

  const ADD_NEW_ENTITY = "Add new lead";
  const DATATABLE_TITLE = "orders List";
  const ENTITY_NAME = "order";
  const CREATE_ENTITY = "Create lead";
  const UPDATE_ENTITY = "Update order";
  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<LeadForm />}
      updateForm={<LeadForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Order;
