import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Classes from './WatchButton.module.css';

//redux
import { connect } from 'react-redux';
import { addWatchItem } from '../../actions/watchList';
import { getWatchList } from '../../actions/watchList';

function WatchButton({ addWatchItem, companyData }) {
  // useEffect(() => {
  //   setLoading(true);
  //   const loadData = async () => {
  //     await loadSearchQuote(companyData.symbol);
  //     setLoading(false);
  //   };
  //   loadData();
  // }, [companyData, loadSearchQuote]);

  const watchItemClickHandler = async () => {
    await addWatchItem(companyData.symbol);
  };

  return (
    <div className={`col s3 ${Classes.watchBtnContainer}`}>
      <i
        class={`small material-icons blue-text ${Classes.watchListStar}`}
        onClick={() => watchItemClickHandler()}
      >
        star_border
      </i>
    </div>
  );
}

// watchButton.propTypes = {};

export default connect(null, { addWatchItem })(WatchButton);
