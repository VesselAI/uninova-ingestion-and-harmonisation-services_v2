import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function WebserviceForm({ webForm, setWebForm, ingestionData, setIngestionData }) {
    


    const handleChange = (event) => {
        console.log(webForm);
        const updatedWebForm = {
            ...webForm,
            [event.target.name]: event.target.value
        }
        setWebForm(updatedWebForm)
    }

    const handleSubmit = () => {
        const updatedIngestionData = {
            ...ingestionData,
            params: webForm
        };

        setIngestionData(updatedIngestionData);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="box">
                <Form.Group as={Col} className="col1">
                    <InputGroup >
                        <InputGroup.Text id="api-url" className="input-group-text-size">
                            API URL
                        </InputGroup.Text>
                        <Form.Control name="url" type="text" aria-label="Select api url" onChange={handleChange} />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="box">
                <Form.Group as={Col} className="col1">
                    <InputGroup>
                        <InputGroup.Text id="header" className="input-group-text-size">
                            Header
                        </InputGroup.Text>
                        <Form.Control name="header" as="textarea" aria-label="Input Header" onChange={handleChange} />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="box">
                <Form.Group as={Col} className="col1">
                    <InputGroup>
                        <InputGroup.Text id="token" className="input-group-text-size">
                            Token
                        </InputGroup.Text>
                        <Form.Control name="token" type="text" aria-label="Input token" required onChange={handleChange} />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Button className="button-placement" variant="outline-primary" type='submit'>Next</Button>
        </Form>
    )
};

export default WebserviceForm