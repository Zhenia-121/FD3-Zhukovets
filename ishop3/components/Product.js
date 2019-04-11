import './Product.css';
import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component{
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        selected: PropTypes.number,
        cbDelete: PropTypes.func.isRequired,
        cbClick: PropTypes.func.isRequired
    }
    deleteRow = () => {
        this.props.cbDelete(this.props.id);
    }
    selectProduct = () => {
        this.props.cbClick(this.props.id);
    }
    render() {
        return (
                <tr 
                    className={(this.props.selected==this.props.id)?'selected':null} 
                    onClick={this.selectProduct}>
                    <td>{this.props.id}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.count}</td>
                    <td>{this.props.price}</td>
                    <td>
                        <img className='productImg' src={this.props.url}></img> 
                    </td>
                    <td>
                        <input type='button' value='Delete' onClick={this.deleteRow}/>
                    </td>
                </tr>
            )
    }
}

export default Product;