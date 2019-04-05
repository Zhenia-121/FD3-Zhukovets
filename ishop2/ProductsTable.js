var ProductsTable = React.createClass( {
    propTypes: {
        storeName: React.PropTypes.string.isRequired,
        products: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
      return { 
        selected: null,
        products: this.props.products.slice()
      };
    },
    clickRow: function(productId) {
        this.setState({selected: productId});
    },
    deleteProduct: function(productId) {
      if (confirm('Are yo really want to delete this product')) {
          this.setState((currState, props) => ({
            products: currState.products.filter(p => p.id != productId)
          }));
      }
    },
    render: function () {
        var productsInTable=this.state.products.map( p =>
            React.createElement(Product, { key:p.id,
              id: p.id,
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