var Product = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        selected: React.PropTypes.string,
        cbDelete: React.PropTypes.func.isRequired,
        cbClick: React.PropTypes.func.isRequired
    },
    deleteRow() {
        this.props.cbDelete(this.props.name);
    },
    selectProduct() {
        this.props.cbClick(this.props.name);
    },
    render: function() {
        return React.DOM.tr({key:this.props.name,className:(this.props.selected==this.props.name)?'selected':null, onClick:this.selectProduct},
            React.DOM.td(null,this.props.name),
            React.DOM.td(null,this.props.count),
            React.DOM.td(null,this.props.price),
            React.DOM.td(null, React.DOM.img({className:'productImg', src:this.props.url})),
            React.DOM.td(null, React.DOM.input({type:'button',value:'Delete',onClick: this.deleteRow}))
            )
    }
})