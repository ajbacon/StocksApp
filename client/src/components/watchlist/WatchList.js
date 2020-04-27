import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import Classes from './WatchList.module.css';
import './WatchList.css';
const $ = window.$;
// import PropTypes from 'prop-types';

function WatchList(props) {
  const [watchItems, setWatchItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $('.collapsible').collapsible();
  }, []);

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
            <i className='material-icons right'>audiotrack</i>
          </div>
          <div className={`collapsible-body`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            voluptas libero iste, adipisci assumenda eos accusamus reiciendis
            quod consequuntur alias natus dolorem quos? Dolore animi,
            necessitatibus odio tempora modi soluta?
          </div>
        </li>
      );
    });
  };

  return <ul class='collapsible'>{renderItems()}</ul>;
}

// WatchList.propTypes = {};

export default WatchList;
