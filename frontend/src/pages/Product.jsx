import React from "react";

import CrudModule from "@/modules/CrudModule";
import ProductForm from "@/forms/ProductForm";

function Product() {
  const entity = "book";
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id'
  };

  const panelTitle = "Product Panel";
  const dataTableTitle = "Products Lists";
  const entityDisplayLabels = ['name'];

  const readColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Price',
      dataIndex: 'price'
    }
  ];
  const dataTableColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      width: 260,
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 320,
      ellipsis: true
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'status',
      dataIndex: 'instock'
    }
  ];

  const ADD_NEW_ENTITY = "Add new product";
  const DATATABLE_TITLE = "products List";
  const ENTITY_NAME = "product";
  const CREATE_ENTITY = "Create product";
  const UPDATE_ENTITY = "Update product";
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
      createForm={<ProductForm />}
      updateForm={<ProductForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Product;
