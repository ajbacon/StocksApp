import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Classes from './WatchButton.module.css';

//redux
import { connect } from 'react-redux';
import { addWatchItem, getWatchList } from '../../actions/watchList';

function WatchButton({
  addWatchItem,
  getWatchList,
  companyData,
  watchListData,
}) {
  useEffect(() => {
    const loadData = async () => {
      await getWatchList();
    };
    loadData();
  }, [addWatchItem]);

  const renderStar = () => {
    return watchListData.find(
      (element) => element.symbol === companyData.symbol
    )
      ? 'star'
      : 'star_border';
  };

  const watchItemClickHandler = async () => {
    await addWatchItem(companyData.symbol);
  };

  return (
    <div className={`col s3 ${Classes.watchBtnContainer}`}>
      <i
        className={`small material-icons blue-text ${Classes.watchListStar}`}
        onClick={() => watchItemClickHandler()}
      >
        {renderStar()}
      </i>
    </div>
  );
}

WatchButton.propTypes = {
  addWatchItem: PropTypes.func.isRequired,
  getWatchList: PropTypes.func.isRequired,
  watchListData: PropTypes.array,
};

const mapStateToProps = (state) => ({
  watchListData: state.watchList.watchListData,
});

export default connect(mapStateToProps, { addWatchItem, getWatchList })(
  WatchButton
);
