var FilterComponent = React.createClass({
    propTypes: {
        strings:React.PropTypes.arrayOf(React.PropTypes.string)
    },
    getInitialState: function() {
        return { 
          filteredStrings: new Array(...this.props.strings),
          filterString: '' 
        } 
    },
    changeStrings(isSorting, filterStr) {
      var newFilteredArray = [];
      if (filterStr != this.state.filterStr || !isSorting) {
        newFilteredArray = this.props.strings.filter((el) => {
          if (el.includes(filterStr)) {
            return el;
          }
        });
        // для случая сортировки - сортируем, для случая изменения строки фильтрации - меняем текущую строку-фильтр
        if (isSorting) {
          newFilteredArray.sort();
        }
        if(filterStr != this.state.filterStr)
          this.setState({filterString: filterStr});
      }
      if (filterStr == this.state.filterStr && isSorting) {
        newFilteredArray = this.state.filteredStrings.sort();
      } 
      this.setState({filteredStrings: newFilteredArray});
    },
    changeHandler(EO) {
        console.log('event:\n' + EO.target.value.split('\n'));
        this.setState({filteredStrings:EO.target.value.split('\n')});
    },
    reset: function() {
      this.setState({
        filteredStrings: new Array(...this.props.strings)
      });
    },
    render: function() {
        return React.DOM.div({className: 'FilterComponent'}, 
        React.createElement(FilterBox, {cbChangeSearchString:this.changeStrings,cbSetSort:this.changeStrings,cbReset:this.reset}), 
        React.DOM.textarea({cols:35,rows:10,value:this.state.filteredStrings.join('\n'), onChange:this.changeHandler})
        )
    }
})