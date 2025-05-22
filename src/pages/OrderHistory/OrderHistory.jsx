import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./OrderHistory.css";
import { fetchUserOrders } from "../../service/orderService";

const OrderHistory = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchOrders = async () => {
    const response = await fetchUserOrders(token);
    setData(response);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Filter historical orders: delivered AND before yesterday
  const historicalOrders = data.filter((order) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const orderDate = new Date(order.orderDate);
    orderDate.setHours(0, 0, 0, 0);
    return (
      order.orderStatus.toLowerCase() === "delivered" && orderDate < yesterday
    );
  });

  // Calculate pagination variables
  const totalOrders = historicalOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = historicalOrders.slice(indexOfFirstOrder, indexOfLastOrder);

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
        <div className="col-11 card">
          {historicalOrders.length === 0 ? (
            <div className="text-center py-5">
              <img
                src={assets.orderNow}
                alt="No Orders"
                className="img-fluid"
                height={200}
                width={300}
              />
              <h6>No past orders found.</h6>
              <h2>Ready for your next meal?</h2>
              <a href="/explore" className="btn btn-primary mt-3">
                Get Started
              </a>
            </div>
          ) : (
            <div className="text-center py-5">
              <h2>Your Order History</h2>
              <p>Here are your past delivered orders</p>
              <img
                src={assets.delivered}
                alt="Delivered Orders"
                className="img-fluid"
                height={200}
                width={300}
              />
              <table className="table table-responsive">
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>
                        {order.orderedItems.map((item, itemIndex) => (
                          itemIndex === order.orderedItems.length - 1
                            ? `${item.name} x ${item.quantity}`
                            : `${item.name} x ${item.quantity}, `
                        ))}
                      </td>
                      <td>₹{order.amount.toFixed(2)}</td>
                      <td>Items: {order.orderedItems.length}</td>
                      <td>{new Date(order.orderDate).toLocaleString('en-IN')}</td>
                      <td className="fw-bold text-capitalize">
                        ●{order.orderStatus}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={fetchOrders}
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;