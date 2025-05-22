import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { getDashboardData } from '../../../service/adminDashboardService';
import { toast } from 'react-toastify';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
    const { token } = useContext(StoreContext);
    const [dashboardData, setDashboardData] = useState({
        todaySales: 0,
        todayOrders: 0,
        weekSales: 0,
        weekOrders: 0,
        monthSales: 0,
        monthOrders: 0,
        quarterSales: 0,
        quarterOrders: 0,
        yearSales: 0,
        yearOrders: 0,
        totalCustomers: 0,
        topFoodItems: [],
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await getDashboardData(token);
                setDashboardData(data);
            } catch (error) {
                toast.error('Failed to load dashboard data. Please try again.');
            }
        };
        if (token) {
            fetchDashboardData();
        }
    }, [token]);

    // Pie Chart Data for Sales Distribution
    const salesPieData = {
        labels: ['Today', 'Last Week', 'Last Month', 'Quarterly', 'Yearly'],
        datasets: [{
            data: [
                dashboardData.todaySales,
                dashboardData.weekSales,
                dashboardData.monthSales,
                dashboardData.quarterSales,
                dashboardData.yearSales
            ],
            backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
            hoverBackgroundColor: ['#FF8787', '#6BE7DE', '#61C7E7', '#AEE8C8', '#FFF5C2'],
        }],
    };

    // Bar Chart Data for Orders
    const ordersBarData = {
        labels: ['Today', 'Last Week', 'Last Month', 'Quarterly', 'Yearly'],
        datasets: [{
            label: 'Number of Orders',
            data: [
                dashboardData.todayOrders,
                dashboardData.weekOrders,
                dashboardData.monthOrders,
                dashboardData.quarterOrders,
                dashboardData.yearOrders
            ],
            backgroundColor: '#216d91',
            borderColor: '#1a5675',
            borderWidth: 1,
        }],
    };

    // Bar Chart Data for Top 5 Food Items
    const topFoodItemsBarData = {
        labels: dashboardData.topFoodItems.map(item => item.name),
        datasets: [{
            label: 'Quantity Sold',
            data: dashboardData.topFoodItems.map(item => item.quantity),
            backgroundColor: '#45B7D1',
            borderColor: '#3a9bb3',
            borderWidth: 1,
        }],
    };

    // Chart Options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { size: 12 } },
            },
            tooltip: { enabled: true },
        },
    };

    // CSV Export Function
    const exportToCSV = () => {
        const headers = [
            'Metric,Value',
            `Today's Sales,₹${dashboardData.todaySales.toFixed(2)}`,
            `Today's Orders,${dashboardData.todayOrders}`,
            `Last Week Sales,₹${dashboardData.weekSales.toFixed(2)}`,
            `Last Week Orders,${dashboardData.weekOrders}`,
            `Last Month Sales,₹${dashboardData.monthSales.toFixed(2)}`,
            `Last Month Orders,${dashboardData.monthOrders}`,
            `Quarterly Sales,₹${dashboardData.quarterSales.toFixed(2)}`,
            `Quarterly Orders,${dashboardData.quarterOrders}`,
            `Yearly Sales,₹${dashboardData.yearSales.toFixed(2)}`,
            `Yearly Orders,${dashboardData.yearOrders}`,
            `Total Customers,${dashboardData.totalCustomers}`,
            '',
            'Top Food Items,Quantity Sold',
            ...dashboardData.topFoodItems.map(item => `${item.name},${item.quantity}`),
        ];

        const csvContent = headers.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `dashboard_data_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container dashboard-container">
            <div className="py-5 row justify-content-center">
                <div className="col-11 card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-center mb-0">Admin Dashboard</h2>
                        <button className="btn btn-primary export-btn" onClick={exportToCSV}>
                            <i className="bi bi-download me-2"></i>Export CSV
                        </button>
                    </div>
                    <div className="row g-4">
                        {/* Today's Stats */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card stat-card">
                                <div className="card-body">
                                    <h5 className="card-title">Today's Sales</h5>
                                    <p className="card-text">₹{dashboardData.todaySales.toFixed(2)}</p>
                                    <p className="card-text small">Orders: {dashboardData.todayOrders}</p>
                                </div>
                            </div>
                        </div>
                        {/* Last Week's Stats */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card stat-card">
                                <div className="card-body">
                                    <h5 className="card-title">Last Week</h5>
                                    <p className="card-text">₹{dashboardData.weekSales.toFixed(2)}</p>
                                    <p className="card-text small">Orders: {dashboardData.weekOrders}</p>
                                </div>
                            </div>
                        </div>
                        {/* Last Month's Stats */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card stat-card">
                                <div className="card-body">
                                    <h5 className="card-title">Last Month</h5>
                                    <p className="card-text">₹{dashboardData.monthSales.toFixed(2)}</p>
                                    <p className="card-text small">Orders: {dashboardData.monthOrders}</p>
                                </div>
                            </div>
                        </div>
                        {/* Quarterly Stats */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card stat-card">
                                <div className="card-body">
                                    <h5 className="card-title">Quarterly</h5>
                                    <p className="card-text">₹{dashboardData.quarterSales.toFixed(2)}</p>
                                    <p className="card-text small">Orders: {dashboardData.quarterOrders}</p>
                                </div>
                            </div>
                        </div>
                        {/* Yearly Stats */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card stat-card">
                                <div className="card-body">
                                    <h5 className="card-title">Yearly</h5>
                                    <p className="card-text">₹{dashboardData.yearSales.toFixed(2)}</p>
                                    <p className="card-text small">Orders: {dashboardData.yearOrders}</p>
                                </div>
                            </div>
                        </div>
                        {/* Total Customers */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card stat-card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Customers</h5>
                                    <p className="card-text">{dashboardData.totalCustomers}</p>
                                    <p className="card-text small">Unique Users</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Charts Section */}
                    <div className="mt-5">
                        <h3 className="text-center mb-4">Sales & Orders Overview</h3>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="card chart-card">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Sales Distribution</h5>
                                        <div className="chart-container">
                                            <Pie data={salesPieData} options={chartOptions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card chart-card">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Orders Over Time</h5>
                                        <div className="chart-container">
                                            <Bar data={ordersBarData} options={chartOptions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Top 5 Food Items */}
                    <div className="mt-5">
                        <h3 className="text-center mb-4">Top 5 Food Items</h3>
                        {dashboardData.topFoodItems.length === 0 ? (
                            <p className="text-center text-muted">No data available</p>
                        ) : (
                            <>
                                <div className="card chart-card mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Top Food Items by Quantity</h5>
                                        <div className="chart-container">
                                            <Bar data={topFoodItemsBarData} options={chartOptions} />
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Food Item</th>
                                            <th>Quantity Sold</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dashboardData.topFoodItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;