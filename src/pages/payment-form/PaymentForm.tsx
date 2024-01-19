import React, { RefObject } from "react";
import { PaymentFormState } from "./types";
import * as apis from "./apis";

const PaymentForm: React.FC<{}> = () => {
  const hiddenTokenInputRef: RefObject<HTMLInputElement> = React.createRef();
  const hiddenOrderIdInputRef: RefObject<HTMLInputElement> = React.createRef();
  const hiddenReturnUrlInputRef: RefObject<HTMLInputElement> = React.createRef();
  const hiddenCancelUrlInputRef: RefObject<HTMLInputElement> = React.createRef();
  const formSubmitInputRef: RefObject<HTMLInputElement> = React.createRef();
  const [state, dispatch] = React.useState<PaymentFormState>({
    orderDescription: "",
    totalAmount: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    apis.createOrder({
      customerName: state.customerName,
      customerEmail: state.customerEmail,
      customerPhone: state.customerPhone,
      orderDescription: state.orderDescription,
      totalAmount: parseFloat(state.totalAmount),
    }).then(response => {
      const { merchantWebToken, orderId, returnUrl, cancelUrl } = response.data.data;
      if (formSubmitInputRef.current && hiddenTokenInputRef.current && hiddenOrderIdInputRef.current && hiddenReturnUrlInputRef.current
        && hiddenCancelUrlInputRef.current) {
        hiddenTokenInputRef.current.value = merchantWebToken;
        hiddenOrderIdInputRef.current.value = orderId;
        hiddenReturnUrlInputRef.current.value = returnUrl;
        hiddenCancelUrlInputRef.current.value = cancelUrl;

        formSubmitInputRef.current.click();
      }
    });
  }

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <h3 className="text-2xl font-bold text-blue-500 mb-8">
              SK Solutions - Payment Gateway
            </h3>

            <p className="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally
              independent from manufacturer and other group control gives you
              confidence that we will only recommend what is right for you.
            </p>

            <div className="mt-8">
              <a href="" className="text-2xl font-bold text-pink-600">
                {" "}
                077 773 6903{" "}
              </a>

              <address className="mt-2 not-italic">
                90/F, Kurwalana, Kahatowita, SL 11144
              </address>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                  value={state.customerName}
                  onChange={(e) =>
                    dispatch((prevState) => ({
                      ...prevState,
                      customerName: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Email address"
                  type="email"
                  id="email"
                  value={state.customerEmail}
                  onChange={(e) =>
                    dispatch((prevState) => ({
                      ...prevState,
                      customerEmail: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="amount">
                    Amount
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Payment Amount"
                    type="number"
                    id="amount"
                    value={state.totalAmount}
                    onChange={(e) =>
                      dispatch((prevState) => ({
                        ...prevState,
                        totalAmount: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Phone Number"
                    type="tel"
                    id="phone"
                    value={state.customerPhone}
                    onChange={(e) =>
                      dispatch((prevState) => ({
                        ...prevState,
                        customerPhone: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="description">
                  Description
                </label>

                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Payment Description"
                  rows={8}
                  id="description"
                  value={state.orderDescription}
                  onChange={(e) =>
                    dispatch((prevState) => ({
                      ...prevState,
                      orderDescription: e.target.value,
                    }))
                  }
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  onClick={(e) => handleClick(e)}
                >
                  CheckOut
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
        <input ref={hiddenTokenInputRef} name="merchantWebToken" />
        <input ref={hiddenOrderIdInputRef} name="orderId" />
        <input name="orderDescription" value={state.orderDescription} />
        <input ref={hiddenReturnUrlInputRef} name="returnUrl" />
        <input ref={hiddenCancelUrlInputRef} name="cancelUrl" />
        <input name="totalAmount" value={state.totalAmount} />
        <input name="customerName" value={state.customerName} />
        <input name="customerEmail" value={state.customerEmail} />
        <input name="customerPhone" value={state.customerPhone} />
        <input ref={formSubmitInputRef} type="submit" value="Checkout Now" />
      </form>

      {/* <form method="POST" action="https://sandbox.ipay.lk/ipg/checkout">
        <input placeholder="token" name="merchantWebToken" value="eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiIwMDAwMDE3MyJ9.O4HEoHZs3GLrCdlBVSgW_Lkvp6ESzOhXemIVnvQCZvnQBGA2WnOnUyQ4hVyLSkQZHY3cxHK-3EkOodGg01kzWg" />
        <input placeholder="orderId" name="orderId" value="OID910ef5c8-2f18-47cc-85dd-c0e767d8df91" />
        <input placeholder="description" name="orderDescription" value={state.orderDescription}
          onChange={(e) =>
            dispatch((prevState) => ({
              ...prevState,
              orderDescription: e.target.value,
            }))
          } />
        <input placeholder="returnUrl" name="returnUrl" value="http://localhost:3000/return?orderId=OID910ef5c8-2f18-47cc-85dd-c0e767d8df91" />
        <input placeholder="cancelUrl" name="cancelUrl" value="http://localhost:3000/cancel?orderId=OID910ef5c8-2f18-47cc-85dd-c0e767d8df91" />
        <input placeholder="amount" name="totalAmount" value={state.totalAmount}
          onChange={(e) =>
            dispatch((prevState) => ({
              ...prevState,
              totalAmount: e.target.value,
            }))
          } />
        <input placeholder="name" name="customerName" value={state.customerName}
          onChange={(e) =>
            dispatch((prevState) => ({
              ...prevState,
              customerName: e.target.value,
            }))
          } />
        <input placeholder="email" name="customerEmail" value={state.customerEmail}
          onChange={(e) =>
            dispatch((prevState) => ({
              ...prevState,
              customerEmail: e.target.value,
            }))
          } />
        <input placeholder="phone" name="customerPhone" value={state.customerPhone}
          onChange={(e) =>
            dispatch((prevState) => ({
              ...prevState,
              customerPhone: e.target.value,
            }))
          } />
          <input type="submit" value="Checkout Now" />
      </form> */}

    </section>
  );
}

export default PaymentForm;
