import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import DataContext from '../../context/IngestionDataProvider';

function DatabaseForm({}) {

    const { ingestionData, updateIngestionData } = useContext(DataContext);
    const [databaseForm, setDatabaseForm] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        console.log(databaseForm);
        const updatedDatabaseForm = {
            ...databaseForm,
            [event.target.name]: event.target.value
        }
        setDatabaseForm(updatedDatabaseForm)
    }

    const handleClick = () => {

        const updatedParams = {
            ...databaseForm,
            db_table: "unipi_ais_2019"
        }

        const updatedIngestionData = {
            ...ingestionData,
            params: updatedParams
        };

        updateIngestionData(updatedIngestionData);
        navigate("/schema_selection", { replace: true });
    }

    return (
        <Form className="mt-3">
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="provider" className="input-group-text-size">
                            Provider
                        </InputGroup.Text>
                        <Form.Control name="provider" type="text" aria-label="Select provider" onChange={handleChange}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="url" className="input-group-text-size">URL</InputGroup.Text>
                        <Form.Control name="url" type="text" aria-label="Input url" onChange={handleChange}/>
                        <InputGroup.Text>Port</InputGroup.Text>
                        <Form.Control name="port" type="text" aria-label="Input port" onChange={handleChange}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="database" className="input-group-text-size">
                            Database
                        </InputGroup.Text>
                        <Form.Control name="db" type="text" aria-label="Select database" onChange={handleChange}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="table" className="input-group-text-size">
                            Table
                        </InputGroup.Text>
                        <Form.Control name="dbtable" type="text" aria-label="Select table" onChange={handleChange}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="username" className="input-group-text-size">
                            Username
                        </InputGroup.Text>
                        <Form.Control name="user" type="text" aria-label="Input username" autoComplete="off" onChange={handleChange}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="secret" className="input-group-text-size">
                            Password
                        </InputGroup.Text>
                        <Form.Control name="password" type="password" aria-label="Input password" autoComplete="new-password" onChange={handleChange}/>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="box">
                <Col className="col-conn-type">
                    <InputGroup>
                        <InputGroup.Text id="driver" className="input-group-text-size">
                            Driver
                        </InputGroup.Text>
                        <Form.Control name="driver" type="text" aria-label="Select driver" onChange={handleChange}/>
                    </InputGroup>
                </Col>
            </Row>
            <Button className="button-placement" variant="outline-primary" onClick={handleClick}>Next</Button>
        </Form>
    )
};

export default DatabaseForm