import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import LoadingBar from '../layout/LoadingBar';
import './WatchList.css';
const $ = window.$;

function WatchList(props) {
  const [watchItems, setWatchItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $('.collapsible').collapsible({
      accordion: false,
    });
  });

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const res = await axios.get('/api/watchitems');
        setWatchItems(res.data);
      } catch (err) {
        console.log(err.data);
      }
      setLoading(false);
    })();
  }, []);

  const renderItems = () => {
    return watchItems.map((item, i) => {
      return (
        <li key={i}>
          <div className={`collapsible-header`}>
            <i className='material-icons expand'>expand_less</i>
            {item.symbol}
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

export default WatchList;
