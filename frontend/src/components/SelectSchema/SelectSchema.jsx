import { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BiRightArrowAlt } from "react-icons/bi";
import Dropdown from "../Dropdowns/Dropdown";
import ListItems from '../ListItems/ListItems';
import DropdownSimple from '../Dropdowns/DropdownSimple';
import DropdownMapping from '../Dropdowns/DropdownMapping';
import DataContext from '../../context/IngestionDataProvider';
import { useNavigate } from "react-router-dom";
import './SelectSchema.css'
import { updateMappingSchemaList, getMappingSchemaList, getNLPSchema, getHarmoSchema, saveMappingSchema } from '../../utils/Backend';

function SelectSchema() {

    const { ingestionData, updateIngestionData } = useContext(DataContext);

    const [params, setParams] = useState({});
    const [button, setButton] = useState(false);
    const [dataSchema, setDataSchema] = useState([]);
    const [nlpSchema, setNlpSchema] = useState([]);
    const [mapSchemaName, setMapSchemaName] = useState('');
    const [mapSchemaType, setMapSchemaType] = useState('');
    const [mapSchemaList, setMapSchemaList] = useState([]);
    const [nlpResult, setNlpResult] = useState([]);
    const [harmoList, setHarmoList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
        getHarmonizationSchema();
    }, [])

    useEffect(() => {
        console.log(nlpResult);
        updateSchemas();
    }, [nlpResult])

    useEffect(() => {
        console.log(nlpSchema);
    }, [nlpSchema])


    async function fetchData () {
        const list = await getMappingSchemaList();
        setMapSchemaList(list);
    }

    async function getMappingSchema () {
        const results = await getNLPSchema(ingestionData);
        console.log(results);
        setNlpResult(results);
    }

    async function getHarmonizationSchema () {
        const results = await getHarmoSchema(ingestionData);
        console.log(results);
        setHarmoList(results);
    }

    function updateSchemas () {
        const updatedDataSchema = nlpResult.map((i) => i[0]);
        console.log(updatedDataSchema);
        
        const updatedNlpSchema = nlpResult.map((i) => i[1]);
        console.log(updatedNlpSchema);

        setDataSchema(updatedDataSchema);
        setNlpSchema(updatedNlpSchema);
    }

    const handleClick = () => {
        setButton(!button);
        getMappingSchema();
    }

    const handleSubmit = () => {
        const data = {'mapSchemaName':mapSchemaName, 'schemaType': mapSchemaType, 'type': ingestionData.type, 'raw': dataSchema, 'harmonized':nlpSchema};
        saveMappingSchema(data);
        const updatedSchemaList = [...mapSchemaList, mapSchemaName];
        setMapSchemaList(updatedSchemaList);
        updateMappingSchemaList({'schema_type': mapSchemaType, 'mapping_schema_name': mapSchemaName});

        setButton(false);
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setMapSchemaName(event.target.value);
    }

    const handleSelect = () => {
        console.log(ingestionData);
        navigate("/harmonization", { replace: true });
    }

    return (
        <Container>
            <h1>Data Ingest</h1>
            <Row className="box1">
                <Col className="text-right" xs={2}>
                    Mapping Schema
                </Col>
                <Col>
                    <Dropdown type='mapping_schema' defaultValue='Select the Mapping Schema' options={mapSchemaList} data={ingestionData} setData={updateIngestionData} setParams={setParams} />
                </Col>
                <Col className='col1' xs={1}>
                    <Button className='button-left' variant="outline-primary" onClick={handleClick} > + </Button>
                </Col>
                <Col className='col3' xs={1}>
                    <Button className='button-fit' variant="primary" onClick={handleSelect}> 
                        <BiRightArrowAlt className='button-logo'/> 
                    </Button>
                </Col>
            </Row>

            {button === true && (
                <Container fluid className={'container-mapping-schema'} >
                    <Row className='box2'>
                        <Col className='col2'>
                            <DropdownMapping  type='data_type' defaultValue='Select the data type' options={['AIS Data', 'Weather Data', 'Noon Reports Data']} setMappingSchemaType={setMapSchemaType} />
                        </Col>
                    </Row>
                    <Row className='box-mapping-schema'>
                        <Col className='col2'>
                            <ListItems list={dataSchema} /> 
                        </Col>
                        <Col className='col2' >
                            <DropdownSimple list={nlpSchema} dropdownList = {harmoList} setData = {setNlpSchema} />
                        </Col> 
                    </Row>

                    <Row className='box-name-save'>
                        <Col className='col-form'>
                            <Form className='form'>
                                <Form.Group as={Col} className="col-form">
                                    <InputGroup >
                                        <InputGroup.Text id="schema_name" className="input-group-text-size">
                                            Name
                                        </InputGroup.Text>
                                        <Form.Control name="schema_name" placeholder="Name the mapping schema" onChange={handleChange} />
                                        <Button variant="primary" onClick={handleSubmit} > Save </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )}
        </Container >
    );
}

export default SelectSchema;
