var Product = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        selected: React.PropTypes.number,
        cbDelete: React.PropTypes.func.isRequired,
        cbClick: React.PropTypes.func.isRequired
    },
    deleteRow() {
        this.props.cbDelete(this.props.id);
    },
    selectProduct() {
        this.props.cbClick(this.props.id);
    },
    render: function() {
        return React.DOM.tr({key:this.props.id,className:(this.props.selected==this.props.id)?'selected':null, onClick:this.selectProduct},
            React.DOM.td(null,this.props.name),
            React.DOM.td(null,this.props.count),
            React.DOM.td(null,this.props.price),
            React.DOM.td(null, React.DOM.img({className:'productImg', src:this.props.url})),
            React.DOM.td(null, React.DOM.input({type:'button',value:'Delete',onClick: this.deleteRow}))
            )
    }
})