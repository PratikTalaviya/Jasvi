import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { transcationhistory } from '../https/axios'

const Transaction = () => {
    const [transdetails, setTransdetails] = useState([])
    useEffect(() => {
        async function fetch() {
            const data = await transcationhistory()
            setTransdetails(data.data.UsersPaymentList)
        }
        fetch()
    }, [])

    return (
        <>
            <Header />
            <div className="transction">
                <div className="container">
                    <ul className="breadcrumb">
                        <li>
                            <Link to="/" className="bread-des"><i className="fa fa-home"></i></Link>
                        </li>
                        <li>
                            <Link to="/" className="bread-des">Home</Link>
                        </li>
                        <li>
                            <a href="#">Transction</a>
                        </li>
                    </ul>
                    <div className="your-transction cusOvr">
                        <h3>your-transction</h3>
                        <table className="table-responsive table mt-4">
                            <tbody>
                                <tr className="list-contant">
                                    <th>payment_id</th>
                                    <th>status</th>
                                </tr>

                                {
                                    transdetails && transdetails.map((data) =>
                                        <tr className="list-contant">

                                            <td className="text-left">
                                                <a >
                                                    <strong>{data.payment_id}</strong>
                                                </a>

                                            </td>
                                            <td className="text-left">{data.status}</td>
                                        </tr>
                                    )
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Transaction
