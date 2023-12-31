import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ selectedClass, price }) => {
    const { user } = useAuth();
    const stripe = useStripe()
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');



    useEffect(() => {
       if(price > 0){
        axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
       }

    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('')
            // console.log('payment method', paymentMethod)
        }
        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }

        console.log('payment Intent', paymentIntent)
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: selectedClass.length,
                selectedClassItems: selectedClass.map(item => item._id),
                classItemsNames: selectedClass.map(item => item.classId),
                status: 'service pending',
                classNames: selectedClass.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Payment Successfull',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })

        }


    }

    return (
        <>
            <form className='w-2/3 m-8' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-active bg-green-500 text-xl mt-4 btn-sm" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>


            {cardError && <p className='text-red-500'>{cardError}</p>}
            {transactionId && <p className='text-green-500'>Transaction Complete with transactionId : {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;