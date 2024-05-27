import React from "react";
import Filter from './Filter';
import ListWords from './ListWords';

const ListMain: React.FC = () => {

    return (
      <>
        <Filter />
        <ListWords />
      </>
    );
};


export default ListMain;