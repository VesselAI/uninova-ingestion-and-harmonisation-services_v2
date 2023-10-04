import Form from 'react-bootstrap/Form';

function DropdownMapping({ type, defaultValue, options, setMappingSchemaType }) {

  const handleChange = (event) => {
    const choice = event.target.value;
    let updatedData = '';
    if(choice === 'AIS Data'){
        updatedData = 'ais';
    }
    if(choice === 'Weather Data'){
        updatedData = 'weather';
    }
    if(choice === 'Noon Reports Data'){
        updatedData = 'noon_reports'
    }
    setMappingSchemaType(updatedData);
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

export default DropdownMapping;