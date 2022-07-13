import React, {createContext} from 'react';
import FilterStore from "../store/FilterStore";
import TableStore from "../store/TableStore";
import SortStore from "../store/SortStore";

export const Context = createContext(null)

const ContextProvider = ({ children }) => {
    return (
        <Context.Provider value={{
            filterStore: new FilterStore(),
            tableStore: new TableStore(),
            sortStore: new SortStore()
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;