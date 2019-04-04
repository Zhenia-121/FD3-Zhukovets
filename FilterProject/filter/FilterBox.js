var FilterBox = React.createClass({
    propTypes: {
        cbChangeSearchString: React.PropTypes.func.isRequired,
        cbSetSort: React.PropTypes.func.isRequired,
        cbReset: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            searchString:'',
            isSorting: false
        }
    },
    changeSearchString: function (EO) {
        this.props.cbChangeSearchString(this.state.isSorting, EO.target.value);
        this.setState({searchString: EO.target.value})
    },
    setSorting: function(EO) {
        this.props.cbSetSort(!this.state.isSorting, this.state.searchString);
        console.log(!this.state.isSorting);
        this.setState({isSorting:!this.state.isSorting});
    },
    reset: function() {
        this.props.cbReset();
        this.setState({searchString:'', isSorting:false});
    },
    render: function() {
        return React.DOM.div(
            {className: 'FilterBox'},
            React.DOM.input({type:'checkbox',checked:this.state.isSorting,onChange: this.setSorting}),
            React.DOM.input({type:'text',value: this.state.searchString,onChange:this.changeSearchString}),
            React.DOM.input({type:'button', value:'Reset', onClick: this.reset}))
    }
})