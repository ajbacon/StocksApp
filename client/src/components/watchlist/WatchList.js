import React, { useEffect, useState } from 'react';
import LoadingBar from '../layout/LoadingBar';
import './WatchList.css';
// import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';
import { getWatchList } from '../../actions/watchList';

const $ = window.$;

function WatchList({ getWatchList, watchListData }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    $('.collapsible').collapsible({
      accordion: false,
    });
  });

  const renderItems = () => {
    return watchListData.map((item, i) => {
      return (
        <li key={i}>
          <div className={`collapsible-header`}>
            <i className='material-icons expand'>expand_more</i>
            <b>{`${item.symbol} - ${item.description}`}</b>
          </div>
          <div className={`collapsible-body`}>
            This drop down will contain more market data and news articles
            related to the company
          </div>
        </li>
      );
    });
  };

  return loading ? (
    <LoadingBar />
  ) : (
    <ul className='collapsible expandable'>{renderItems()}</ul>
  );
}

// WatchList.propTypes = {};

const mapStateToProps = (state) => ({
  watchListData: state.watchList.watchListData,
});

export default connect(mapStateToProps, { getWatchList })(WatchList);
