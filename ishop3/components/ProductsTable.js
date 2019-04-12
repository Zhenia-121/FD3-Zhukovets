import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import ProductCard from './ProductCard';
import EditProductForm from './EditProductForm';
require ('./ProductsTable.css');

class ProductsTable extends React.Component {
  static propTypes = {
    storeName: PropTypes.string.isRequired,
    products: PropTypes.array
  };
  state = {
    mode: null,
    selected: null,
    selectedProduct: null,
    products: this.props.products.slice()
  }  
  clickProduct = (productId) => {
    this.setState(
      { 
        mode: 'view',
        selected: productId,
        selectedProduct: this.props.products.find(p => p.id === productId) 
      });
  }
  editProduct = (productId) => {
    console.log(productId);
    this.setState({ 
        mode: 'edit',
        selected: productId,
        selectedProduct: this.props.products.find(p => p.id === productId)
      }
    );
  }
  saveProduct(savingProduct, id) {
      if (!id) {
        // находим максимальный id продуктов и уыеличиваем на единицу
        let id = this.state.products.reduce((a, b) => (a.id > b.id ? a.id : b.id)) + 1;
        console.log(id);
        savingProduct.id = id;
        console.log(savingProduct);
        this.setState((currState, props) => ({
           products: currState.products.push(savingProduct)
        }));
      }
      else {
        ind = this.state.products.findIndex(p => p.id === id);
        this.setState((currState, props) => ({
          products: currState.products.splice(index, 1, savingProduct)
       }));
      }       
  }
  createProduct = () => {
    this.setState({
      mode: 'create',
      selected : 0,
      selectedProduct: {}
    });
  }
  deleteProduct = (productId) => {
    if (confirm('Are yo really want to delete this product')) {
      this.setState((currState, props) => ({
        products: currState.products.filter(p => p.id != productId)
      }));
    }
  }
  cancel() {
    this.setState({
      mode: null
    })
  }
  render() {
    var productsInTable = this.state.products.map(p =>
      <Product
        key={p.id}
        id={p.id}
        name={p.name}
        count={p.count}
        price={p.price}
        url={p.url}
        selected={this.state.selected}
        cbClick={this.clickProduct}
        cbDelete={this.deleteProduct}
        cbEdit={this.editProduct}
      />);
    return (
      <div className='ProductsTable'>
        <h2>{this.props.storeName}</h2>
        <table className='products'>
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
            (this.state.mode !== 'edit') &&
            <input  type="button" value='New Product' onClick={this.createProduct}/>
          }  
          </div>
      </div>
      <div className="ViewCard">
        {
          (this.state.selected && this.state.mode === 'view') && 
              <ProductCard
                product={this.state.selectedProduct} 
            />
        }
      </div>
      <div className="EditCard">
      {
          (this.state.mode === 'edit' || this.state.mode === 'create') &&
          <EditProductForm
              product={this.state.selectedProduct}
              mode = {this.state.mode}
              cbSave = {this.saveProduct}
              cbCancel = {this.cancel}
          />
        }
      </div>
      </div>
    );
  }
}

export default ProductsTable;