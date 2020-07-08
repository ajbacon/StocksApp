import React from 'react';
import PropTypes from 'prop-types';

import Classes from './WatchButton.module.css';

//redux
import { connect } from 'react-redux';
import { addWatchItem } from '../../actions/watchList';

function WatchButton({ addWatchItem, companyData, watchListData }) {
  const renderStar = () => {
    return watchListData.find(
      (element) => element.symbol === companyData.symbol
    )
      ? 'star'
      : 'star_border';
  };

  const watchItemClickHandler = async () => {
    await addWatchItem(companyData);
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
  watchListData: PropTypes.array,
};

const mapStateToProps = (state) => ({
  watchListData: state.watchList.watchListData,
});

export default connect(mapStateToProps, { addWatchItem })(WatchButton);
