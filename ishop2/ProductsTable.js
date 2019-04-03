var ProductsTable = React.createClass( {
    propTypes: {
        storeName: React.PropTypes.string.isRequired,
        products: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
      return { 
        selected: null
      };
    },
    clickRow: function(name) {
        this.setState({selected: name});
    },
    deleteProduct: function(productName) {
      if (confirm('Are yo really want to delete this product')) {
          var ind = this.props.products.findIndex(p => p.name == productName);
          this.props.products.splice(ind, 1);
      }
    },
    render: function () {
        var productsInTable=this.props.products.map( p =>
            React.createElement(Product, { key:p.name,
              name: p.name,
              count: p.count,
              price: p.price,
              url: p.url,
              selected: this.state.selected,
              cbClick: this.clickRow,
              cbDelete: this.deleteProduct}));

        return React.DOM.div( {className:'ProductsTable'}, 
          React.DOM.h2( {className:'storeName'}, this.props.storeName),
          React.DOM.table( {className:'products'}, 
            React.DOM.thead({className: "productsTableHead"},
                React.DOM.tr({}, 
                    React.DOM.th(null, "Name"),
                    React.DOM.th(null, "Remaining Amount"),
                    React.DOM.th(null, "Price"),
                    React.DOM.th(null, "Image"),
                    React.DOM.th(null, "Actions")
                ) 
            ),
            React.DOM.tbody({className:'productsTableBody'}, productsInTable)),
          );
    }
})