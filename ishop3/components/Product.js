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
        canEdit: PropTypes.bool.isRequired,
        canDelete: PropTypes.bool.isRequired,
        selected: PropTypes.number,
        cbDelete: PropTypes.func.isRequired,
        cbClick: PropTypes.func.isRequired,
        cbEdit: PropTypes.func.isRequired
    }
    deleteProduct = (EO) => {
        EO.stopPropagation();
        this.props.cbDelete(this.props.id);
    }
    editProduct = (EO) => {
        EO.stopPropagation();
        this.props.cbEdit(this.props.id);
    }
    selectProduct = () => {
        if (this.props.canEdit)
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
                        {/* <img className='productImg' src={this.props.url}></img>  */}
                        {this.props.url}
                    </td>
                    <td>
                        <input type='button' disabled={!this.props.canEdit} value='Edit' onClick={this.editProduct}/>
                        <input type='button' disabled={!this.props.canDelete} value='Delete' onClick={this.deleteProduct}/>
                    </td>
                </tr>
            )
    }
}

export default Product;