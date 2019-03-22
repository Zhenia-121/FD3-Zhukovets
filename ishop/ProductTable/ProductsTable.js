var ProductsTable = React.createClass( {
    propTypes: {
        storeName: React.PropTypes.string.isRequired,
        products: React.PropTypes.array.isRequired
    },
    render: function () {
        var productsInTable=this.props.products.map( p =>
            React.DOM.tr({key:p.name,className:'ProductRow'},
              React.DOM.td({className:'Name'},p.name),
              React.DOM.td({className:'Count'},p.count),
              React.DOM.td({className:'Price'},p.price),
              React.DOM.td({className:'Image'}, React.DOM.img({className:'productImg', src:p.url}))
              
            ),
          );
        return React.DOM.div( {className:'ProductsTable table'}, 
          React.DOM.h2( {className:'storeName'}, this.props.storeName ),
          React.DOM.table( {className:'products'}, 
            React.DOM.thead({className: "productsTableHead"},
                React.DOM.tr({}, 
                    React.DOM.th({}, "Name"),
                    React.DOM.th({}, "Remaining Amount"),
                    React.DOM.th({}, "Price"),
                    React.DOM.th({}, "Image")
                ) 
            ),
            React.DOM.tbody({className:'productsTableBody'}, productsInTable)),
          );
    }
})