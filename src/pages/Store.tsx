import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useEffect, useState } from "react"
import axios from "axios";

export function Store() {  

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('?limit=5');

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products${query}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, []);
  
  return (  
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
      {loading && "Loading..."}
      {!!data && data.length > 0 ? (
        data.map(item => {
          return (
            <Col key={item.id}>
              <StoreItem {...item} />
              {/* {JSON.stringify({item})} */}
            </Col>
          );
        })):(<p>API did not provide any product, try again.</p>)
      }
      </Row>
    </>
}