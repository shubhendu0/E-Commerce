import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.auth.user);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await axios.post("http://localhost:8000/api/orders", {
                userId: currentUser._id,
                products: cart.products.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color
                })),
                amount: cart.total,
                address: data.billing_details.address,
                });
                setOrderId(res.data._id);
            } 
            catch {
                toast.error("Order Failed",{
                    toastId : "error"
                });
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        {
            orderId
            ? 
            `Order has been created successfully. Your order number is ${orderId}`
            : 
            `Successful. Your order is being prepared...`
        }
      <button style={{ padding: 10, marginTop: 20 }}> Go to Homepage </button>
    </div>
  )
}

export default Success;