import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { useLocalStorage } from "./useLocalStorage";

const DataContext = createContext();

const IngestionDataProvider = ({ children }) => {

    const [ingestionData, setIngestionData] = useState({
        name: "",
        task: "",
        type: "",
        params: {},
        data_type: "",
        mapping_schema: ""
    })

    const [params, setParams] = useState({});

    const updateIngestionData = (updatedData) => {
        setIngestionData(updatedData)
    };

    const updateParams = (updatedParams) => {
        setParams(updatedParams);
    }

    const value = useMemo(
        () => ({
            ingestionData,
            updateIngestionData,
            params,
            updateParams
        }),
        [ingestionData]
    );
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};


export default DataContext;
export { IngestionDataProvider };
