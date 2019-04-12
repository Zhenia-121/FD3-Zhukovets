import React from 'react';
import PropTypes from 'prop-types';
require ('./EditProductForm.css');

class EditProductForm extends React.Component {
    static propTypes = {
        product: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            count: PropTypes.number,
            price: PropTypes.number,
            url: PropTypes.string
        }),
        mode: PropTypes.string.isRequired,
        cbSave: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired
    }
    state = {
        name: this.props.product.name,
        count: this.props.product.count,
        price: this.props.product.price,
        url: this.props.product.url
    }
    // static getDerivedStateFromProps(nextProps,prevState) {
    //     return {
    //         name: nextProps.product.name,
    //         count: nextProps.product.count,
    //         price: nextProps.product.price,
    //         url: nextProps.product.url
    //     };
    // }
    componentWillReceiveProps =  (nextProps) => {
        this.setState({
            name: nextProps.product.name,
            count: nextProps.product.count,
            price: nextProps.product.price,
            url: nextProps.product.url
        });
    }
    changeName = (EO) => {
        let value = EO.target.value;
        console.log(value);
        this.setState({
            name:value
        });
    }
    changePrice = (EO) => {
        this.setState({
            price:EO.target.value
        });
    }
    changeCount = (EO) => {
        this.setState({
            count:EO.target.value
        });
    }
    changeUrl = (EO) => {
        this.setState({
            url:EO.target.value
        });
    }
    saveProduct = () => {
        if (this.props.mode === 'create')
            this.props.cbSave(this.state, null)
        this.props.cbSave(this.state, this.props.product.id);
    }
    cancel = () => {

    }
    render() {
        return (
            <div className="EditProduct">
                <h2>
                        {
                            (this.props.mode === 'edit')
                            ? 
                                "Edit existing product"
                            : 
                                "Add new Product"
                        }
                </h2>
                <form>
                    {
                        (this.props.product) &&
                        <div>
                            <label>ID:</label>
                            <div>{this.props.product.id}</div>
                        </div> 
                    }
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.changeName}/>
                    </div>
                    <div>
                        <label>Count:</label>
                        <input type="number" name="count" value={this.state.count} onChange={this.changeCount}/>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" name="price" value={this.state.price} onChange={this.changePrice}/>
                    </div>
                    <div>
                        <label>Url:</label>
                        <input type="text" name="url" value={this.state.url} onChange={this.changeUrl}/>
                    </div>
                </form>
                <input type="button" value="Add" onClick={this.saveProduct}/>
                <input type="button" value="Cancel" onClick={this.cancel}/>
            </div>
        )
    }
}

export default EditProductForm