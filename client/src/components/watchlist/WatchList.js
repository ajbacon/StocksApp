import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';

import LoadingBar from '../layout/LoadingBar';
import './WatchList.css';

//redux
import { connect } from 'react-redux';
import { getWatchList } from '../../actions/watchList';

const $ = window.$;

function WatchList({ getWatchList, watchListData }) {
  // const [watchItems, setWatchItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $('.collapsible').collapsible({
      accordion: false,
    });
  });

  useEffect(() => {
    setLoading(true);

    const loadData = async () => {
      await getWatchList();
      setLoading(false);
    };
    loadData();
  }, [getWatchList]);

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
