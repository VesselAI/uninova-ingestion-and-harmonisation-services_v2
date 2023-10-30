import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
function DropdownSimple ({ list, dropdownList, setData }) {

    const dropList = ['', ...dropdownList];

    return(
        <Form>
            {list.map((v, i) => {
                return(
                    <Row className="dropdown-list-row">
                        <Form.Select className="dropdown-list" key={i} onChange={(event) => {
                            const updatedList = [...list.slice(0, i),
                                event.target.value,
                                ...list.slice(i + 1)
                            ];
                            setData(updatedList)}
                        } aria-label="Default select example">
                            <option hidden>{v}</option>
                            {dropList.map((value, index) => {
                                return(
                                    <option key={index} value={value}>{value}</option>
                                )
                            })}
                        </Form.Select>
                    </Row>
                )
            })}
        </Form>
    )
}

export default DropdownSimple