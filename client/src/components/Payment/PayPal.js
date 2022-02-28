import React, { useEffect, useRef } from "react";

export default function PayPal() {
    const paypal = useRef()

    useEffect(()=> {
        window.paypal.Buttons({
            createOrder:(data,actions,err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_items: [
                        {
                            description: "Forza Horizon",
                            price: {
                                currency_code: "USD",
                                value: 0,
                            }
                        }
                    ]
                })
            },
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}