import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import LoadingBar from '../layout/LoadingBar';
import WatchButton from '../watchlist/WatchButton';
import Classes from './SearchQuoteData.module.css';

//redux
import { connect } from 'react-redux';
import { loadSearchQuote } from '../../actions/iexAPI';
import { getWatchList } from '../../actions/watchList';

const moment = require('moment');

const SearchQuoteData = ({
  loadSearchQuote,
  getWatchList,
  companyData,
  searchQuoteData,
  watchListData,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      await loadSearchQuote(companyData.symbol);
      await getWatchList();
      setLoading(false);
    };
    loadData();
  }, [companyData, loadSearchQuote]);

  const renderCurrentPrice = () => {
    // this should probably be its own component at some point
    let { open, high, low, price, previous } = searchQuoteData;

    const delta = price - previous;
    const deltaPercent = (delta / previous) * 100;
    const sign = delta < 0 ? '' : '+';
    const textColor = delta < 0 ? Classes.redText : Classes.greenText;

    const deltaStr = `${sign}${delta.toFixed(2)} (${sign}${deltaPercent.toFixed(
      2
    )}%)`;
    return (
      <Fragment>
        <div className={`col l6 m7 s12`}>
          <div className='row'>
            <div className={`col s12 ${Classes.currentPrice} ${textColor}`}>
              <div style={{ fontSize: '40px', margin: '0 5px 0 0' }}>
                <b>{price.toFixed(2)}</b>
              </div>
              <div style={{ fontSize: '20px', margin: '0 0 6px 0' }}>
                {deltaStr}
              </div>
            </div>
            <div className={`col s12 ${Classes.quoteTimestamp}`}>
              Last updated: {moment().format('LLL')}
            </div>
          </div>
        </div>
        <div className='col l6 m5 s10'>
          <div className={`${Classes.infoItem}`}>
            <div>Day Opening Price: </div>
            <div className='right'>{open.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Day High Price:</div>
            <div>{high.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Day Low Price:</div>
            <div>{low.toFixed(2)}</div>
          </div>
          <div className={Classes.infoItem}>
            <div>Previous Closing Price:</div>
            <div>{previous.toFixed(2)}</div>
          </div>
        </div>
      </Fragment>
    );
  };

  return isLoading ? (
    <LoadingBar />
  ) : (
    <div data-test='component-company-data'>
      <div
        className={`${Classes.companyHeader} `}
        style={{ borderBottom: '1px solid grey' }}
      >
        <div className={`col s9 ${Classes.companyTitle}`}>
          {companyData.description}
        </div>
        <WatchButton companyData={companyData} />
      </div>

      <div className='row'>{renderCurrentPrice()}</div>
    </div>
  );
};

SearchQuoteData.propTypes = {
  loadSearchQuote: PropTypes.func.isRequired,
  addWatchItem: PropTypes.func.isRequired,
  searchQuoteData: PropTypes.object,
  companyData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  searchQuoteData: state.iexAPI.searchQuoteData,
  watchListData: state.watchList.watchListData,
});

export default connect(mapStateToProps, {
  loadSearchQuote,
  getWatchList,
})(SearchQuoteData);
