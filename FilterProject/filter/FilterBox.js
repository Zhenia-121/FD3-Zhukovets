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
        this.setState({searchString: EO.target.value}); 
        this.props.cbChangeSearchString(this.state.isSorting, EO.target.value);
    },
    setSorting: function(EO) {
        this.setState({isSorting:EO.target.checked});
        this.props.cbSetSort(EO.target.checked, this.state.searchString);
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