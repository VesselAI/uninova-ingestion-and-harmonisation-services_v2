import Form from 'react-bootstrap/Form';
function DropdownSimple ({ list, dropdownList, setData }) {

    return(
        <Form>
            {list.map((v, i) => {
                return(
                    <Form.Select className="dropdown-list" key={i} onChange={(event) => {
                        const updatedList = [...list.slice(0, i),
                            event.target.value,
                            ...list.slice(i + 1)
                        ];
                        setData(updatedList)}
                    } aria-label="Default select example">
                        <option hidden>{v}</option>
                        {dropdownList.map((value, index) => {
                            return(
                                <option key={index} value={value}>{value}</option>
                            )
                        })}
                    </Form.Select>
                )
            })}
        </Form>
    )
}

export default DropdownSimple