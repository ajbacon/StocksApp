import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import Classes from './WatchList.module.css';

function WatchList(props) {
  const [watchItems, setWatchItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      return <div className='card'>{item.symbol}</div>;
    });
  };

  return loading ? (
    <div className={`container ${Classes.loadingBar}`}>
      <div className={`progress`}>
        <div class='indeterminate'></div>
      </div>
    </div>
  ) : (
    <div>{renderItems()}</div>
  );
}

// WatchList.propTypes = {};

export default WatchList;
