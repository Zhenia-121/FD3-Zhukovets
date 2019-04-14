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
    errorMessages = {
        textInput: "Please, fill the field",
        numberInput: "Please, fill the field. Value must be greater than 0"
    };
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.product.name,
            count: this.props.product.count,
            price: this.props.product.price,
            validateObject: {
                url: this.validateTextInput(this.props.product.url),
                name: this.validateTextInput(this.props.product.name),
                count: this.validateNumberInput(this.props.product.count),
                price: this.validateNumberInput(this.props.product.price),
            }
        }
    };
    validateTextInput = (text) => { return text && text.length > 1; }
    validateNumberInput = (number) => { return number && number > 0; }
    changeInput = (EO) => {
        var value = EO.target.value;
        let inputName = EO.target.name;
        if (EO.target.type === 'number')
            value = +value;
        this.setState({
            [inputName]: value
        })
    }
    changeName = (EO) => {
        let value = EO.target.value;
        console.log(EO.target.type);
        this.setState({
            name:value
        });
    }
    changePrice = (EO) => {
        this.setState({
            price:+EO.target.value
        });
    }
    changeCount = (EO) => {
        this.setState({
            count:+EO.target.value
        });
    }
    changeUrl = (EO) => {
        this.setState({
            url:EO.target.value
        });
    }
    saveProduct = (EO) => {
        // EO.stopPropagation();
        this.props.cbSave({id: this.props.product.id, ...this.state});
    }
    cancel = () => {
        this.props.cbCancel();
    }
    blurHandler = (EO) => {
        let value = EO.target.value;
        let inputName = EO.target.name;
        let isValid;
        if (EO.target.type === 'text')
            isValid = this.validateTextInput(value);
        else if (EO.target.type === 'number')
            isValid = this.validateNumberInput(+value);
        this.setState((currState, props) => ({
            validateObject: {...currState.validateObject, [inputName]: isValid}
        }));    
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
                        <input type="text" name="name" required value={this.state.name || ''} onChange={this.changeName} onBlur={this.blurHandler}/>
                        {(!this.state.validateObject.name) && <span style={{color:'red'}}>{this.errorMessages.textInput}</span>}
                    </div>
                    <div>
                        <label>Count:</label>
                        <input type="number" name="count" value={this.state.count || 0} onChange={this.changeCount} onBlur={this.blurHandler}/>
                        {(!this.state.validateObject.count) && <span style={{color:'red'}}>{this.errorMessages.numberInput}</span>}
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" name="price" value={this.state.price || 0} onChange={this.changePrice} onBlur={this.blurHandler}/>
                        {(!this.state.validateObject.price) && <span style={{color:'red'}}>{this.errorMessages.numberInput}</span>}
                    </div>
                    <div>
                        <label>Url:</label>
                        <input type="text" name="url" value={this.state.url || ''} onChange={this.changeUrl} onBlur={this.blurHandler}/>
                        {(!this.state.validateObject.url) && <span style={{color:'red'}}>{this.errorMessages.textInput}</span>}
                    </div>
                </form>
                <input type="button" value={(this.props.mode === 'create') ? "Add": "Save"} onClick={this.saveProduct}/>
                <input type="button" value="Cancel" onClick={this.cancel}/>
            </div>
        )
    }
}

export default EditProductForm