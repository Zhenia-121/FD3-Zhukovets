var FilterComponent = React.createClass({
    propTypes: {
        strings:React.PropTypes.arrayOf(React.PropTypes.string)
    },
    getInitialState: function() {
        return { 
          filteredStrings: this.props.strings.slice()
        } 
    },
    changeStrings(isSorting, filterStr) {
      let newArray = [];
      if (filterStr)  
        newArray = this.props.strings.filter((el) => el.includes(filterStr))
      else 
        newArray = this.props.strings.slice();
      if (isSorting) {
        newArray.sort();
      }
      this.setState({filteredStrings: newArray});
    },
    reset: function() {
      this.setState({
        filteredStrings: this.props.strings.slice()
      });
    },
    render: function() {
        return React.DOM.div({className: 'FilterComponent'}, 
        React.createElement(FilterBox, {cbChangeSearchString:this.changeStrings,cbSetSort:this.changeStrings,cbReset:this.reset}), 
        React.DOM.textarea({cols:35,rows:10,value:this.state.filteredStrings.join('\n'), readOnly:true})
        )
    }
})