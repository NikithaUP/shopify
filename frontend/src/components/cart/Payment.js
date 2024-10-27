import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from '../../actions/orderActions';
import { clearError as clearOrderError } from '../../slices/orderSlice';
import MetaData from "../layouts/MetaData";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector(state => state.orderState)

  useEffect(() => {
    if (orderError) {
      toast(orderError, {
        position: "top-right",
        type: "error",
        theme: "dark",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  }, [dispatch, orderError]);

  const paymentData = orderInfo
    ? {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
          name: user.name,
          address: {
            city: shippingInfo.city,
            postal_code: shippingInfo.postalCode,
            country: shippingInfo.country,
            state: shippingInfo.state,
            line1: shippingInfo.address,
          },
          phone: shippingInfo.phoneNo,
        },
      }
    : null;

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !paymentData) return; // Early exit if data is missing

    document.querySelector("#pay_btn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast(result.error.message, {
          type: "error",
          position: "top-right",
          theme: "dark",
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast("Payment Succcess!!", {
            type: "success",
            position: "top-right",
            theme: "dark",
          });

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(orderCompleted());
          dispatch(createOrder(order));
          
          // Navigate to the order success page
          navigate("/order/success");
        } else {
          toast("Please Try Again!!", {
            type: "warning",
            position: "top-right",
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.error(error);
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          {!orderInfo ? (
            <div className="alert alert-danger">
              Order information is missing. Unable to proceed with payment.
            </div>
          ) : (
            <form onSubmit={submitHandler} className="shadow-lg">
              <h1 className="mb-4">Card Info</h1>
              <div className="form-group">
                <label htmlFor="card_num_field">Card Number</label>
                <CardNumberElement
                  type="text"
                  id="card_num_field"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_exp_field">Card Expiry</label>
                <CardExpiryElement
                  type="text"
                  id="card_exp_field"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_cvc_field">Card CVC</label>
                <CardCvcElement
                  type="text"
                  id="card_cvc_field"
                  className="form-control"
                />
              </div>

              <button
                id="pay_btn"
                type="submit"
                className="btn btn-block py-3"
                disabled={!orderInfo}
              >
                Pay - {`$${orderInfo && orderInfo.totalPrice ? orderInfo.totalPrice : '0.00'}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
}
