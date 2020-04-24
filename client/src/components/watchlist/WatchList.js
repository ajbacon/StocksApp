import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

function WatchList(props) {
  const [watchItems, setWatchItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const res = await axios.get('/api/watchitems');
        setWatchItems(res.data);
        console.log(res);
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

  return loading ? <div>Loading...</div> : <div>{renderItems()}</div>;
}

// WatchList.propTypes = {};

export default WatchList;
