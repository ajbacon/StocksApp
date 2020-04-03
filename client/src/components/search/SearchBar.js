import React, { useState } from 'react';
import Classes from './SearchBar.module.css';

const fuzzysort = require('fuzzysort');
const symbolsUS = require('../../config/US');

// improve search bar such that search results can be selected using the arrow keys
// add hover highlighting

const SearchBar = ({ setCompanyData }) => {
  const [search, setSearch] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);

  const searchList = () => {
    return search.map((item, i) => {
      return (
        <div
          className={Classes.resultItem}
          onClick={() => selectResult(item.obj)}
          key={i}
        >
          {item.obj.description}
        </div>
      );
    });
  };

  const searchCode = e => {
    const searchResults = fuzzysort.go(e.target.value, symbolsUS, {
      keys: ['description', 'symbol'],
      limit: 10,
      threshold: -500
    });
    setSearch(searchResults);
  };

  const onSearchFocus = () => {
    setSearchFocus(true);
  };

  const onSearchBlur = () => {
    setTimeout(() => {
      setSearchFocus(false);
    }, 200);
  };

  const selectResult = obj => {
    setCompanyData([obj]);
    setSearchFocus(false);
  };

  return (
    <div>
      <div className={`row ${Classes.searchBarContainer}`}>
        <div className={`card col s12`}>
          <div>
            <div className={`nav-wrapper ${Classes.searchBar}`}>
              <div className='input-field'>
                <input
                  id='search'
                  type='search'
                  placeholder='search...'
                  required
                  onChange={e => searchCode(e)}
                  onFocus={() => onSearchFocus()}
                  onBlur={() => onSearchBlur()}
                  autoComplete='off'
                />
                <label className='label-icon' htmlFor='search'>
                  <i className='material-icons'>search</i>
                </label>
                <i className='material-icons'>close</i>
              </div>
              <div
                className={`card col s12 ${
                  Classes.searchResult
                } ${!searchFocus && Classes.hideElement}`}
              >
                {searchList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
