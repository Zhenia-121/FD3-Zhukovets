import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import ProductCard from './ProductCard';
import EditProductForm from './EditProductForm';
require('./ProductsTable.css');

class ProductsTable extends React.Component {
  static propTypes = {
    storeName: PropTypes.string.isRequired,
    products: PropTypes.array
  };
  state = {
    mode: null, // 'view', 'edit', 'create'
    selected: null,
    products: this.props.products.slice(),
    canEdit: true, // можно ли менять продукты
    canDelete: true // можно ли удалять продукты
  }
  clickProduct = (productId) => {
    this.setState(
      {
        mode: 'view',
        selected: productId,
        canDelete: true
      });
  }
  editProduct = (productId) => {
    console.log(productId);
    this.setState({
      mode: 'edit',
      canDelete: false,
      selected: productId
    }
    );
  }
  saveProduct = (savingProduct) => {
    if (!savingProduct.id) {
      // находим максимальный id продуктов и увеличиваем на единицу
      let newId = this.state.products.reduce((a, b) => (a.id > b.id ? a.id : b.id)) + 1;
      savingProduct.id = newId;
      this.setState((currState, props) => ({
        mode: null,
        selected: null,
        canEdit: true,
        canDelete: true,
        products: [...currState.products, savingProduct]
      }));
    }
    else {
      this.setState((currState, props) => ({
        mode: null,
        selected: null,
        canEdit: true,
        canDelete: true,
        products: currState.products.map(p => {
          return (p.id !== savingProduct.id) ? p : savingProduct;
        })
      }));
    }
  }
  createProduct = () => {
    this.setState({
      mode: 'create',
      selected: 0,
      canEdit: false,
      canDelete: false
    });
  }
  deleteProduct = (productId) => {
    if (confirm('Are yo really want to delete this product')) {
      this.setState((currState, props) => ({
        products: currState.products.filter(p => p.id != productId),
        selected: 0,
        mode: null
      }));
    }
  }
  // запрещаем просмотр и изменение продуктов - в текущий момент продукт selected уже редактируется
  cardChanged = () => {
    this.setState({
      canEdit: false,
      canDelete: false
    });
  }
  cancel = () => {
    this.setState({
      mode: null,
      selected: null,
      canEdit: true,
      canDelete: true
    });
  }
  render() {
    let productsInTable = this.state.products.map(p =>
      <Product
        key={p.id}
        id={p.id}
        name={p.name}
        count={p.count}
        price={p.price}
        url={p.url}
        canEdit={this.state.canEdit}
        canDelete={this.state.canDelete}
        selected={this.state.selected}
        cbClick={this.clickProduct}
        cbDelete={this.deleteProduct}
        cbEdit={this.editProduct}
      />);
    let selectedProduct = {};
    if (this.state.selected)
      selectedProduct = this.state.products.find(p => p.id === this.state.selected);
    return (

      <div>
        <h2>{this.props.storeName}</h2>
        <table className='productsTable'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Remaining Amount</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='productsTableBody'>
            {productsInTable}
          </tbody>
        </table>
        <div className="NewProduct">
          <div className="NewProductBtn">
            {
              (this.state.mode !== 'edit' && this.state.mode !== 'create') &&
              <input type="button" value='New Product' onClick={this.createProduct} />
            }
          </div>
        </div>
        <div className="ViewCard">
          {
            (this.state.mode === 'view' && this.state.selected) &&
            <ProductCard
              product={selectedProduct}
            />
          }
        </div>
        <div key={this.state.selected} className="EditCard">
          {
            (this.state.mode === 'edit' || this.state.mode === 'create') &&
            <EditProductForm
              product={selectedProduct}
              mode={this.state.mode}
              cbSave={this.saveProduct}
              cbCancel={this.cancel}
              cbChanged={this.cardChanged}
            />
          }
        </div>
      </div>
    );
  }
}

export default ProductsTable;