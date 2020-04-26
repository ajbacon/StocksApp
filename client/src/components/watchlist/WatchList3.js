import React from 'react';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';

// import PropTypes from 'prop-types';

function WatchList(props) {
  return (
    <Collapsible accordion={false}>
      <CollapsibleItem
        expanded={false}
        header="Better safe than sorry. That's my motto."
        icon={<i class='material-icons right more'>expand_more</i>}
        node='div'
      >
        <i class='material-icons right more'>expand_more</i>
        Better safe than sorry. That's my motto.
      </CollapsibleItem>
      <CollapsibleItem
        expanded={false}
        header="Yeah, you do seem to have a little 'shit creek' action going."
        icon={<Icon>place</Icon>}
        node='div'
      >
        Yeah, you do seem to have a little 'shit creek' action going.
      </CollapsibleItem>
      <CollapsibleItem
        expanded={false}
        header='You know, FYI, you can buy a paddle. Did you not plan for this contingency?'
        icon={<Icon>whatshot</Icon>}
        node='div'
      >
        You know, FYI, you can buy a paddle. Did you not plan for this
        contingency?
      </CollapsibleItem>
    </Collapsible>
  );
}

// WatchList.propTypes = {};

export default WatchList;
