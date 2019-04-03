var FilterComponent = React.createClass({
    propTypes: {
        strings:React.PropTypes.arrayOf(React.PropTypes.string)
    },
    getInitialState: function() {
        return { 
          filteredStrings: new Array(...this.props.strings)  
        } 
    },
    filterStrings: function(isSorting, filterStr) {
      var newFilteredArray = this.props.strings.filter((el) => {
          if (el.includes(filterStr)) {
            return el;
          }
      });
      if (isSorting) newFilteredArray.sort();
      this.setState({filteredStrings: newFilteredArray});
    },
    sortStrings: function(isSorting, filterStr) {
        if (isSorting) {
          var sortArray = this.state.filteredStrings.sort();
          this.setState({filteredStrings: sortArray});
        } else {
          this.filterStrings(false, filterStr);
        }
    },
    reset: function() {
      this.setState({
        filteredStrings: new Array(...this.props.strings)
      });
    },
    render: function() {
        return React.DOM.div({className: 'FilterComponent'}, 
        React.createElement(FilterBox, { cbChangeSearchString: this.filterStrings, cbSetSort: this.sortStrings, cbReset: this.reset}), 
        React.DOM.textarea({cols:35,rows:10, value:this.state.filteredStrings.join('\n')})
        )
    }
})