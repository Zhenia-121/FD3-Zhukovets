"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ProductsTable from './components/ProductsTable';

let productsArray = require('./products.json');
let storeNameStr = "Organic Shop";

ReactDOM.render(
    <ProductsTable
        storeName={storeNameStr}
        products={productsArray}
    />
    , document.getElementById('container')
);