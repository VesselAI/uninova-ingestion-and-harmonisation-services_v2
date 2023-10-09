import Form from 'react-bootstrap/Form';
function DropdownSimple ({ list, setData }) {

    const handleChange = () => {
        // const elementToAdd = event.target.value;
        // const updatedList = [
        //     ...list.slice(0, index - 1),
        //     elementToAdd,
        //     ...list.slice(index + 1)
        // ];
        // setData(updatedList)
    }

    return(
        <Form>
            {list.map((v, i) => {
                return(
                    <Form.Select className="dropdown-list" key={i} onChange={handleChange} aria-label="Default select example">
                        <option hidden>{v}</option>
                        {list.map((value, index) => {
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