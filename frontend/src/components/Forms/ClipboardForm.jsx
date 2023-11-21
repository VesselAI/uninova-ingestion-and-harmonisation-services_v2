import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { saveClipboardToMongo } from '../../utils/Backend';
import DataContext from '../../context/IngestionDataProvider';





function ClipboardForm ({ setLoading }) {

    const { ingestionData, updateIngestionData } = useContext(DataContext);
    const [data, setData] = useState();
    const [clipboardForm, setClipboardForm] = useState({});

    const navigate = useNavigate();


    const handleChangeFormControl = (event) => {
        setData(event.target.value);
    }

    const handleChange = (event) => {
        console.log(clipboardForm);
        const updatedClipboardForm = {
            ...clipboardForm,
            [event.target.name]: event.target.value
        }
        setClipboardForm(updatedClipboardForm)
    }

    const handleClick = async () =>{
        console.log(data);
        const tableName = (clipboardForm.dataset_name).split(' ').join('_')
        const tableTempName = (clipboardForm.dataset_name).split(' ').join('_') + '_temp'
        
        // TODO: Call API endpoint to send data to mongo as a dataframe
        setLoading(true);
        const result = await saveClipboardToMongo({'db_table_temp': tableTempName, 'data': data});
        console.log(result);
        // TODO: Set mongo table with the data in the params entry of the ingestionData object
        const updatedParams = {
            ...clipboardForm,
            db_table: tableName,
            db_table_temp: tableTempName
        };
        
        const updatedIngestionData = {
            ...ingestionData,
            params: updatedParams
        };
        
        updateIngestionData(updatedIngestionData);
        console.log(ingestionData);
        
        setLoading(false);
        navigate("/schema_selection", { replace: true });
    }

    return(
        <Form className="mt-3">
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="provider" className="input-group-text-size-clipboard">
                            Provider
                        </InputGroup.Text>
                        <Form.Control name="provider" type="text" aria-label="Select provider" onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="dataset_name" className="input-group-text-size-clipboard">
                            Dataset Name
                        </InputGroup.Text>
                        <Form.Control name="dataset_name" type="text" aria-label="Select dataset name" onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <Form.Group className="mt-3" controlId="ClipboardTextArea">
                        <Form.Control as="textarea" rows={10} placeholder="Insert the data as key-value pair separated by the - or : characters, with one key-value pair per row." onChange={handleChangeFormControl} />
                    </Form.Group>
                </Col>
            </Row>
            <Button className="button-placement" variant="outline-primary" onClick={handleClick}>Next</Button>
        </Form>
    )
}

export default ClipboardForm;