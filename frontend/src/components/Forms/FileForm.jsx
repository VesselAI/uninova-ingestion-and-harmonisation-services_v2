import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import DataContext from '../../context/IngestionDataProvider';
import { testeApi } from '../../utils/Backend';
import "../Workspace/Workspace.css"
import { uploadFile } from '../../utils/Backend';


function FileForm({ setLoading }) {

    const { ingestionData, updateIngestionData } = useContext(DataContext);
    const [fileForm, setFileForm] = useState({});
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    useEffect(() => {
        // Code here will run on the first render of the component
        const updatedFileForm = {
            provider: '',
            file_type: "json",
            delimiter: '',
            file_path: ''
        }
        setFileForm(updatedFileForm)
        
        // Cleanup function (optional) - it will run when the component unmounts
        return () => {
            // Cleanup code here (if needed)
        };
    }, []); // Empty dependency array means this effect runs once

    useEffect(() => {
        if (file != null){
            const updatedFileForm = {
                ...fileForm,
                file_path: './files/' + String(file.name)
            }
            setFileForm(updatedFileForm);
            console.log(fileForm);
        }
    }, [file])

    const handleChange = (event) => {
        const updatedFileForm = {
            ...fileForm,
            [event.target.name]: event.target.value
        }
        setFileForm(updatedFileForm);
    }

    const handleSubmit = async () => {

        const updatedParams = {
            ...fileForm,
            db_table: String(ingestionData.data_type).toLowerCase().split(' ').join('_') + "_data_" + String(fileForm.provider).toLowerCase().split(' ').join('_')
        }

        
        setLoading(true);
        if (file) {
            const formData = new FormData();
            console.log(file.name);
            console.log(file);
            formData.append('file', file);
            console.log(formData.get('file'));
            await uploadFile(formData);
        } else {
            console.error('No file selected for upload.');
        }
        
        const updatedIngestionData = {
            ...ingestionData,
            params: updatedParams,
        };

        updateIngestionData(updatedIngestionData);

        setLoading(false);
        navigate("/schema_selection", { replace: true });
    }


    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    return (
        <Form onSubmit={handleSubmit} className="form-size">
            <Row className="box">
                <Form.Group as={Col} className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="provider" className="input-group-text-size">
                            Provider
                        </InputGroup.Text>
                        <Form.Control name="provider" type="text" aria-label="Select provider" onChange={handleChange} />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="box">
                <Form.Group as={Col} className="col-conn-type">
                    <InputGroup >
                        <InputGroup.Text id="file-type" className="input-group-text-size">
                            File Type
                        </InputGroup.Text>
                        <Form.Select name="file_type" aria-label="Select file type" onChange={handleChange}>
                            <option value="json">json</option>
                            <option value="csv">csv</option>
                        </Form.Select>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} xs="2">
                    <InputGroup>
                        <InputGroup.Text id="delimiter">
                            Delimiter
                        </InputGroup.Text>
                        <Form.Control name="delimiter" type="text" disabled={fileForm.file_type !== "csv"} aria-label="Select delimiter" onChange={handleChange} />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="box">
                <Col className="box-upload-file" >
                    <input className="file-upload" type="file" name='file' accept=".json, .csv" onChange={handleFileChange} />
                </Col>
                {/* <Form.Group as={Col} className="col
                -conn-type">
                    <InputGroup>
                        <InputGroup.Text id="file-path" className="input-group-text-size">
                            File Path
                        </InputGroup.Text>
                        <Form.Control name="file_path" type="text" aria-label="Select delimiter" onChange={handleChange} />
                    </InputGroup>
                </Form.Group> */}
            </Row>
            <Button className="button-placement" variant="outline-primary" onClick={handleSubmit}>Next</Button>
        </Form>
    )
};

export default FileForm