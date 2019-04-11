import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import './ProductsTable.css';

class ProductsTable extends React.Component {
    static propTypes = {
        storeName: PropTypes.string.isRequired,
        products: PropTypes.array
    };
    state = {
        selected: null,
        products: this.props.products.slice()
    }
    clickRow =  (productId) => {
        this.setState({selected: productId});
    }
    deleteProduct = (productId) => {
      if (confirm('Are yo really want to delete this product')) {
          this.setState((currState, props) => ({
            products: currState.products.filter(p => p.id != productId)
          }));
      }
    }
    render() {
        var productsInTable=this.state.products.map( p =>
          <Product
              key={p.id}
              id={p.id}
              name={p.name}
              count={p.count}
              price={p.price}
              url={p.url}
              selected={this.state.selected}
              cbClick={this.clickRow}
              cbDelete={this.deleteProduct}
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
          </div> 
        );
    }
}

export default ProductsTable;