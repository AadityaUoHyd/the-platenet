import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./MyOrders.css";
import { fetchUserOrders } from "../../service/orderService";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await fetchUserOrders(token);
    setData(response);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Filter recent orders: not delivered OR from today/yesterday
  const recentOrders = data.filter((order) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const orderDate = new Date(order.orderDate);
    orderDate.setHours(0, 0, 0, 0); // Normalize to start of day
    console.log(`Order: ${order.orderStatus}, Date: ${orderDate}, Yesterday: ${yesterday}`); // Debug log
    return (
      order.orderStatus.toLowerCase() !== "delivered" || orderDate >= yesterday
    );
  });

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          {recentOrders.length === 0 ? (
            <div className="text-center py-5">
              <img
                src={assets.orderNow}
                alt="No Orders"
                className="img-fluid"
                height={200}
                width={300}
              />
              <h6>Feeling Hungry? Your plate is waiting..</h6>
              <h2>Your meal is a click away!</h2>
              <a href="/explore" className="btn btn-primary mt-3">
                Get Started
              </a>
            </div>
          ) : (
            <div className="text-center py-5">
              <h2>Your Orders</h2>
              <p>Here are your recent orders</p>
              <img
                src={assets.delivered}
                alt="No Orders"
                className="img-fluid"
                height={200}
                width={300}
              />
              <table className="table table-responsive">
                <tbody>
                  {recentOrders
                  .filter((order) => order.paymentStatus === "Paid")
                  .map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {order.orderedItems.map((item, index) => {
                            if (index === order.orderedItems.length - 1) {
                              return item.name + " x " + item.quantity;
                            } else {
                              return item.name + " x " + item.quantity + ", ";
                            }
                          })}
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;