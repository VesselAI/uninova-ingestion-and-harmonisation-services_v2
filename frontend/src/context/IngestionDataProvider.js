import { createContext, useMemo, useState } from "react";
// import { useLocalStorage } from "./useLocalStorage";

const DataContext = createContext();

const IngestionDataProvider = ({ children }) => {

    const [ingestionData, setIngestionData] = useState({
        name: "",
        task: "",
        type: "",
        params: {},
        data_type: "",
        mapping_schema: "",
        output_db_type: "jdbc",
    })

    const [params, setParams] = useState({});

    const updateIngestionData = (updatedData) => {
        setIngestionData(updatedData)
    };

    const updateParams = (updatedParams) => {
        setParams(updatedParams);
    }

    const clearIngestionData = () => {
        const updatedIngestionData  = {
            name: "",
            task: "",
            type: "",
            params: {},
            data_type: "",
            mapping_schema: "",
            output_db_type: "mongo",
        };
        setParams(updatedIngestionData);
    }

    const value = useMemo(
        () => ({
            ingestionData,
            updateIngestionData,
            params,
            updateParams,
            clearIngestionData
        }),
        [ingestionData]
    );
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};


export default DataContext;
export { IngestionDataProvider };
