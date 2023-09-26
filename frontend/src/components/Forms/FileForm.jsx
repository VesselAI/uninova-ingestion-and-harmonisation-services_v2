import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

function FileForm({ fileForm, setFileForm, ingestionData, setIngestionData }) {
    useEffect(() => {
        // Code here will run on the first render of the component
        const updatedFileForm = {
            provider: '',
            file_type: "json",
            delimiter: '',
            file_path: ''
        }
        setFileForm(updatedFileForm)

        // You can perform any other actions or side effects here

        // Cleanup function (optional) - it will run when the component unmounts
        return () => {
            // Cleanup code here (if needed)
        };
    }, []); // Empty dependency array means this effect runs once

    const handleChange = (event) => {
        console.log(fileForm);
        const updatedFileForm = {
            ...fileForm,
            [event.target.name]: event.target.value
        }
        setFileForm(updatedFileForm)
    }

    const handleSubmit = () => {

        const updatedIngestionData = {
            ...ingestionData,
            params: fileForm
        };

        setIngestionData(updatedIngestionData);


    }

    return (
        <Form onSubmit={handleSubmit} className="form-size">
            <Row className="box">
                <Form.Group as={Col} className="col1">
                    <InputGroup>
                        <InputGroup.Text id="provider" className="input-group-text-size">
                            Provider
                        </InputGroup.Text>
                        <Form.Control name="provider" type="text" aria-label="Select provider" onChange={handleChange} />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="box">
                <Form.Group as={Col} className="col1">
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
                <Form.Group as={Col} className="col1">
                    <InputGroup>
                        <InputGroup.Text id="file-path" className="input-group-text-size">
                            File Path
                        </InputGroup.Text>
                        <Form.Control name="file_path" type="text" aria-label="Select delimiter" onChange={handleChange} />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Button className="button-placement" variant="outline-primary" onClick={handleSubmit}>Next</Button>
        </Form>
    )
};

export default FileForm