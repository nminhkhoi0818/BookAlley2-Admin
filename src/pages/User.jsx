import React from "react";

import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";
import { Tag } from 'antd';

function Customer() {
  const entity = "user";
  const searchConfig = {
    displayLabels: ['username', 'email', 'role'],
    searchFields: 'username,email,role',
    outputValue: 'email'
  };

  const panelTitle = "User Panel";
  const dataTableTitle = 'Users Lists';
  const entityDisplayLabels = ['username', 'email'];

  const readColumns = [
    {
      title: 'Username',
      dataIndex: 'username'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Verified',
      dataIndex: 'verified'
    },
    {
      title: 'Created at',
      dataIndex: 'created_at'
    }
  ];
  const dataTableColumns = [
    {
      title: 'Username',
      dataIndex: 'username'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => {
        let color = 'orange';
        if (role === 'admin') {
          color = 'red';
        } else if (role === 'seller') {
          color = 'orange';
        } else if (role === 'user') {
          color = 'blue';
        }
        // let color = status === 'pending' ? 'volcano' : 'green';
        if (role) return <Tag color={color}>{role.toUpperCase()}</Tag>;
        return <Tag color={color}>{}</Tag>
      }
    }
  ];

  const ADD_NEW_ENTITY = "Add new customer";
  const DATATABLE_TITLE = "customers List";
  const ENTITY_NAME = "User";
  const CREATE_ENTITY = "Create customer";
  const UPDATE_ENTITY = "Update customer";
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
      createForm={<CustomerForm />}
      updateForm={<CustomerForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Customer;
