import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import { fetchAllOrders, updateOrderStatus } from "../../services/adminOrderService";
import { toast } from "react-toastify";
import "./AdminOrders.css";

const Orders = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;

  const fetchOrders = async () => {
    try {
      const response = await fetchAllOrders();
      setData(response);
    } catch (error) {
      toast.error("Unable to display the orders. Please try again.");
    }
  };

  const updateStatus = async (event, orderId) => {
    const success = await updateOrderStatus(orderId, event.target.value);
    if (success) await fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate pagination variables
  const totalOrders = data.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = data.slice(indexOfFirstOrder, indexOfLastOrder);

  // Pagination navigation handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page) => setCurrentPage(page);

  // Generate page numbers for display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card p-4">
          {totalOrders === 0 ? (
            <div className="text-center py-5">
              <img
                src={assets.orderNow}
                alt="No Orders"
                className="img-fluid"
                height={200}
                width={300}
              />
              <h6>No orders found.</h6>
            </div>
          ) : (
            <>
              <table className="table table-responsive">
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={index} className="align-middle">
                      <td style={{ minWidth: "220px" }}>
                        <div className="fw-bold mb-1">
                          {order.orderedItems.map((item, itemIndex) => (
                            itemIndex === order.orderedItems.length - 1
                              ? `${item.name} x ${item.quantity}`
                              : `${item.name} x ${item.quantity}, `
                          ))}
                        </div>
                        <div className="text-muted small">{order.userAddress}</div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          Items: {order.orderedItems.length}
                        </span>
                      </td>
                      <td>
                        <span className="fw-semibold">₹{order.amount.toFixed(2)}</span>
                      </td>
                      <td>
                        <div className="small fw-semibold">
                          {new Date(order.orderDate).toLocaleDateString('en-IN')}
                        </div>
                        <div className="text-muted small">
                          {new Date(order.orderDate).toLocaleTimeString('en-IN')}
                        </div>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          onChange={(event) => updateStatus(event, order.id)}
                          value={order.orderStatus}
                        >
                          <option value="Food Preparing">Food Preparing</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="pagination mt-4 d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-outline-primary mx-1"
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                  >
                    First
                  </button>
                  <button
                    className="btn btn-outline-primary mx-1"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      className={`btn mx-1 ${currentPage === number ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => goToPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    className="btn btn-outline-primary mx-1"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                  <button
                    className="btn btn-outline-primary mx-1"
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                  >
                    Last
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;