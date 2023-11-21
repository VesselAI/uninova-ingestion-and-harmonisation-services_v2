import ListGroup from 'react-bootstrap/ListGroup';


function ListItems({ list }) {

    return (
        <ListGroup>
            {list.map((v, i) => {    
                return(
                    <ListGroup.Item key={"left".concat(String(i))}>{v}</ListGroup.Item>
                );                           
            })}
        </ListGroup>
    )
}

export default ListItems;