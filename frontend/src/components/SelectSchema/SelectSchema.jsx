import { useEffect, useState } from 'react';
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
import './SelectSchema.css'

// import FileForm from '../Forms/FileForm';
// import DatabaseForm from '../Forms/DatabaseForm';
// import WebserviceForm from '../Forms/WebserviceForm';
// import './Workspace.css'

function SelectSchema() {


    const [ingestionData, setIngestionData] = useState({
        name: "",
        task: "",
        type: "",
        params: {},
        data_type: "",
        mapping_schema: ""
    })

    const [params, setParams] = useState({});
    const [button, setButton] = useState(false);
    const [dataSchema, setDataSchema] = useState(['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']);
    const [nlpSchema, setNlpSchema] = useState(['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c']);
    const [mapSchemaName, setMapSchemaName] = useState('');
    const [mapSchemaList, setMapSchemaList] = useState([]);

    useEffect(() => {
        // TODO: Get list of mapping schemas
        // TODO: Get raw and NLP harmonized schemas
    }, [])

    const handleClick = () => {
        setButton(!button);
    }

    const handleSubmit = () => {
        // TODO: Save Mapping Schema
        setButton(false);
    }
    const handleChange = (event) => {
        console.log(event.target.value);
        setMapSchemaName(event.target.value);
    }

    const handleSelect = () => {
        const updatedIngestionData = {
            ...ingestionData,
            ['mapping_schema']: mapSchemaName,
        };

        setIngestionData(updatedIngestionData);
        console.log(ingestionData);
    }

    return (
        <Container>
            <h1>Data Ingest</h1>
            <Row className="box1">
                <Col className="text-right" xs={2}>
                    Mapping Schema
                </Col>
                <Col>
                    <Dropdown type='mapping_schema' defaultValue='Select the Mapping Schema' options={['XXXXX', 'YYYYYY', 'ZZZZZ']} data={ingestionData} setData={setIngestionData} setParams={setParams} />
                </Col>
                <Col className='col1' xs={1}>
                    <Button className='button-right' variant="outline-primary" onClick={handleClick} > + </Button>
                </Col>
                <Col className='col3' xs={1}>
                    <Button className='button-fit' variant="primary" onClick={handleSelect}> 
                        <BiRightArrowAlt className='button-logo'/> 
                    </Button>
                </Col>
            </Row>

            {button === true && (
                <Container fluid>
                    <Row className='box2'>
                        <Col className='col2'>
                            <Dropdown  type='data_type' defaultValue='Select the data type' options={['AIS Data', 'Weather Data', 'Noon Reports Data']} data={ingestionData} setData={setIngestionData} setParams={setParams} />
                        </Col>
                    </Row>
                    <Row className='box-mapping-schema'>
                        <Col className='col2'>
                            <ListItems list={dataSchema} /> 
                        </Col>
                        <Col className='col2' >
                            <DropdownSimple list={nlpSchema} />
                        </Col> 
                    </Row>

                    <Row className='box-mapping-schema'>
                        <Col className='col2'>
                            <Form className='form'>
                                <Form.Group as={Col} className="col2">
                                    <InputGroup >
                                        <InputGroup.Text id="schema_name" className="input-group-text-size">
                                            Name
                                        </InputGroup.Text>
                                        <Form.Control name="schema_name" placeholder="Name the mapping schema" onChange={handleChange} />
                                        <Button variant="outline-primary" onClick={handleSubmit} > Save </Button>
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
