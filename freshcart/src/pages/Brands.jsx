import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getBrands() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(data.data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    }
    getBrands();
  }, []);

  function handleShow(brand) {
    setSelectedBrand(brand);
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-4 text-center">Brands</h4>
      <div className="row g-4">
        {brands.map((brand) => (
          <div className="col-6 col-md-4 col-lg-3" key={brand._id}>
            <div
              className="card text-center p-4 brand-card border-0 shadow-sm cursor-pointer"
              onClick={() => handleShow(brand)}
              style={{
                minHeight: "220px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-100 mb-2"
                style={{ height: "160px", objectFit: "contain" }}
              />
              <h6 className="fw-medium text-muted m-0">{brand.name}</h6>
            </div>
          </div>
        ))}
      </div>

    
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBrand?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h3 className="text-success fw-bold">{selectedBrand?.name}</h3>
          <img
            src={selectedBrand?.image}
            alt={selectedBrand?.name}
            className="img-fluid"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
