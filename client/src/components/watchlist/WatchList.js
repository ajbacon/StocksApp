import React, { useEffect, useState } from 'react';
import LoadingBar from '../layout/LoadingBar';
import './WatchList.css';
// import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';
import { loadWatchListData } from '../../actions/iexAPI.js';

const $ = window.$;

function WatchList({ loadWatchListData, watchListData }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    $('.collapsible').collapsible({
      accordion: false,
    });
  });

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      await loadWatchListData(watchListData);
      setLoading(false);
    };
    loadData();
  }, [loadWatchListData]);

  const renderNewsArticles = (newsData) => {
    return newsData.map((item, index) => {
      return (
        <a
          key={index}
          href={item.url}
          className='news-item'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img className='news-image' src={item.image} alt='news-item' />
          <p className='headline-text'>{item.headline}</p>
        </a>
      );
    });
  };

  const renderItems = () => {
    return watchListData.map((item, i) => {
      return (
        <li key={i}>
          <div className={`collapsible-header`}>
            <i className='material-icons expand'>expand_more</i>
            <b>{`${item.symbol} - ${item.description}`}</b>
          </div>
          <div className={`collapsible-body`}>
            {renderNewsArticles(item.newsData)}
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

export default connect(mapStateToProps, { loadWatchListData })(WatchList);
