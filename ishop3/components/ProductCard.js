import React from 'react';
import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends React.Component {
    static propTypes = {
        product: PropTypes.shape(
            {
                name: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired
            }
        )
        
    }
    render() {
        return (
        <div className="ProductCard">
            <h2>{this.props.product.name} Card</h2>
            <ul>
                <li>Count: {this.props.product.count}</li>
                <li>Price: {this.props.product.price}</li>
                <li>imageUrl: {this.props.product.url}</li>
            </ul>
        </div> 
        );   
    }
    
}

export default ProductCard