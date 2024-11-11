import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInventory } from "../context/InventoryContext"; 
import { InventoryItem } from "../types/InventoryTypes";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItemById } = useInventory(); 
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        const fetchedItem = await getItemById(Number(id));
        setItem(fetchedItem);
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [id, getItemById]);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mt-4 text-center">
        <h3 className="text-danger">Item not found</h3>
        <Link to="/" className="btn btn-secondary mt-3">Back to List</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={import.meta.env.VITE_API_URL + item.imageUrl}
              alt={item.name}
              className="img-fluid rounded-start"
              style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-8 d-flex align-items-center">
            <div className="card-body">
              <h2 className="card-title text-primary">{item.name}</h2>
              <p className="card-text text-muted">{item.description}</p>
              <Link to="/" className="btn btn-outline-primary mt-3">
                <i className="bi bi-arrow-left"></i> Back to List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
