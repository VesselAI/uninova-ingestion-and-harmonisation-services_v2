import Form from 'react-bootstrap/Form';

function Dropdown({ type, defaultValue, options, data, setData, setParams }) {

  const handleChange = (event) => {
    console.log(data);

    const updatedData = {
      ...data,
      [type]: event.target.value,
    };

    setData(updatedData);
    if (type === "type"){
      setParams({});
    }
  };



  return (
    <Form.Select onChange={handleChange} aria-label="Default select example">
      <option hidden>{defaultValue}</option>
      {options.map((value, index) => {
        return (<option key={index} value={value}>{value}</option>);
      })}
    </Form.Select>
  );
}

export default Dropdown;