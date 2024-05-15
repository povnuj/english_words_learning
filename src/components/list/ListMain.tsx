import React from "react";
import Filter from './Filter';
import ListWords from './ListWords';

import { WordsStateProvider } from "../../context/words-context";


const ListMain: React.FC = () => {

    return (
      <>
        <Filter />
        <ListWords />
      </>
    );
};


export default ListMain;