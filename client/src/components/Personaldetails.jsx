// import React, { useState, useEffect } from 'react'
// import Footer from '../components/Footer'
// import Header from '../components/Header'
// import { AddAddress, OrderHistory, UpdateAddress, UpdateUser, UserDetail } from '../https/axios'
// import { toast } from 'react-toastify'
// import { Navigate, useNavigate } from 'react-router-dom'

// const Personaldetails = ({ shipping_is_billing, setShipping_is_billing,
//     setShipping_customer_name,
//     setShipping_last_name,
//     setShipping_address,
//     setShipping_address_2,
//     setShipping_city,
//     setShipping_pincode,
//     setShipping_country,
//     setShipping_email,
//     setShipping_phone,
//     setShipping_state,
//     setBilling_customer_name,
//     setBilling_last_name,
//     setBilling_address,
//     setBilling_address_2,
//     setBilling_pincode,
//     setBilling_city,
//     setBilling_country,
//     setBilling_state,
//     setBilling_email,
//     setBilling_phone }) => {
//     const [userdata, setUserdata] = useState('')
//     const [first_name, setFirst_name] = useState('')
//     const [last_name, setLast_name] = useState('')
//     const [phone, setPhone] = useState('')
//     const [date_of_birth, setDate_of_birth] = useState('')
//     const [state, setState] = useState('')
//     const [ship_address1, setShip_address1] = useState('')
//     const [ship_address2, setShip_address2] = useState('')
//     const [ship_zip, setShip_zip] = useState('')
//     const [ship_city, setShip_city] = useState('')
//     const [ship_country, setShip_country] = useState('')

//     const navigate = useNavigate()

//     useEffect(() => {
//         async function user() {
//             const udetail = await UserDetail()
//             setUserdata(udetail.data.User)
//         }
//         user()
//     }, [])


//     const Birthdate = (date) => {
//         const day = new Date(date).getDate() + 1
//         const month = new Date(date).getMonth() + 1
//         const year = new Date(date).getFullYear()
//         return `${day}-${month}-${year}`
//     }

//     const updatedata = async () => {
//         const updateuser = await UpdateUser({ first_name, last_name, phone, date_of_birth })
//         if (updateuser) {
//             setFirst_name('')
//             setLast_name('')
//             setPhone('')
//             setDate_of_birth('')
//             toast("Update Detail Successfully", { theme: "dark", type: "success" })
//         }
//     }

//     const addaddress = async () => {
//         try {
//             if (ship_address1 && ship_address2 && ship_zip && ship_city && state && ship_country) {
//                 const address = await AddAddress({ ship_address1, ship_address2, ship_zip, ship_city, state, ship_country })
//                 if (address.data.Success === 1) {
//                     setShip_address1('')
//                     setShip_address2('')
//                     setShip_zip('')
//                     setState('')
//                     setShip_city('')
//                     setShip_country('')
//                     toast("Add Address Sucessfully", { theme: "dark", type: "success" })
//                     navigate("/payment")
//                 }
//                 else {
//                     toast("Add Address Failed", { theme: "dark", type: "error" })
//                 }
//             }
//             else {
//                 toast("Add Address Failed", { theme: "dark", type: "error" })
//             }
//         } catch (error) {
//             toast("Add Address Failed", { theme: "dark", type: "error" })
//         }
//     }
//     return (
//         <>
//             {/* <div className="shop-login mt-4 d-flex align-items-start">
//                 <i className="fa-solid fa-user icon mt-1"></i>
//                 <div className="login-details ms-4">
//                     <h5 className="d-block detail-title">login details</h5>
//                     <div className="your-detail mt-2">
//                         {
//                             userdata && userdata.map((data) => {
//                                 return (
//                                     <div>
//                                         <span><strong>First Name  :</strong> {data.first_name}</span>
//                                         <span><strong>last Name :</strong> {data.last_name}</span>
//                                         <span><strong>number :</strong> {data.phone}</span>
//                                         <span><strong>Date of Birthday :</strong> {Birthdate(data.date_of_birth)}</span>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//                 <a href="#" className="ms-auto change-detail" data-bs-toggle="modal" data-bs-target="#personal-detail">EDIT</a>
//                 <div className="modal fade" id="personal-detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title edit-add" id="exampleModalLabel">Edit Your New details</h5>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body pb-0">
//                                 <span className="login-name">Your First Name :</span>
//                                 <input name="text" placeholder="Enter Your First Name" className="p-2 mt-2 w-100" value={first_name} onChange={e => { setFirst_name(e.target.value) }} />
//                                 <span className="login-name mt-3 d-block">Your Last Name :</span>
//                                 <input name="text" placeholder="Enter Your Last Name" className="p-2 mt-2 w-100" value={last_name} onChange={e => { setLast_name(e.target.value) }} />
//                                 <span className="login-name mt-3 d-block">Your Number :</span>
//                                 <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setPhone(e.target.value) }} />
//                                 <span className="login-name mt-3 d-block">Your Date Of Birth :</span>
//                                 <input type="date" placeholder="dd / mm / yyyy" className="p-2 mt-2 w-100" value={date_of_birth} onChange={e => { setDate_of_birth(e.target.value) }} />
//                             </div>
//                             <div className="modal-footer">
//                                 <a onClick={updatedata} className="btn btn-secondary">Enter</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
            
//     {/* const [shipping_customer_name, setShipping_customer_name] = useState('')
//     const [shipping_last_name, setShipping_last_name] = useState('')
//     const [shipping_address, setShipping_address] = useState('')
//     const [shipping_address_2, setShipping_address_2] = useState('')
//     const [shipping_city, setShipping_city] = useState('')
//     const [shipping_pincode, setShipping_pincode] = useState('')
//     const [shipping_country, setShipping_country] = useState('')
//     const [shipping_state, setShipping_state] = useState('')
//     const [shipping_email, setShipping_email] = useState('')
//     const [shipping_phone, setShipping_phone] = useState('')
//     const [billing_customer_name, setBilling_customer_name] = useState('')
//     const [billing_last_name, setBilling_last_name] = useState('')
//     const [billing_address, setBilling_address] = useState('')
//     const [billing_address_2, setBilling_address_2] = useState('')
//     const [billing_city, setBilling_city] = useState('')
//     const [billing_pincode, setBilling_pincode] = useState('')
//     const [billing_country, setBilling_country] = useState('')
//     const [billing_state, setBilling_state] = useState('')
//     const [billing_email, setBilling_email] = useState('')
//     const [billing_phone, setBilling_phone] = useState('') */}
//             <div className="address mt-4 d-flex align-items-start">
//                 <div className="modal-body pb-0">
//                     <h5>SHIPPING ADDRESS</h5>
//                     <hr />
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name">First Name :</span>
//                             <input name="text" placeholder="Enter Your First Name" className="p-2 mt-2 w-100" value={shipping_customer_name} onChange={e => { setShipping_customer_name(e.target.value) }} /></div>
//                         <div className='col-6'> <span className="login-name d-block">Last Name :</span>
//                             <input name="text" placeholder="Enter Your Last Name" className="p-2 mt-2 w-100" value={shipping_last_name} onChange={e => { setShipping_last_name(e.target.value) }} /></div>
//                     </div>
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Email :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_email(e.target.value) }} /></div>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Number :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_phone(e.target.value) }} /></div>
//                     </div>
//                     <span className="login-name mt-3 d-block">Your Address :</span>
//                     <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_address(e.target.value) }} />
//                     <span className="login-name mt-3 d-block">Your Address2 :</span>
//                     <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_address_2(e.target.value) }} />
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name mt-3 d-block">City :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_city(e.target.value) }} /></div>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Your State :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_state(e.target.value) }} /></div>
//                     </div>
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Zip/ Postal code :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_pincode(e.target.value) }} /></div>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Country :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setShipping_country(e.target.value) }} /></div>
//                     </div>
//                     <div className='mt-3'>  <input type="checkbox" onClick={(e) => setShipping_is_billing(!shipping_is_billing)} /> My billing and shipping address are the same </div>
//                 </div>
//             </div>
//             <div className={`address mt-4 d-flex align-items-start ${shipping_is_billing ? "trueNone" : ""}`} >
//                 <div className="modal-body pb-0">
//                     <h5>BILLING ADDRESS</h5>    
//                     <hr />
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name">First Name :</span>
//                             <input name="text" placeholder="Enter Your First Name" className="p-2 mt-2 w-100" value={first_name} onChange={e => { setBilling_customer_name(e.target.value) }} /></div>
//                         <div className='col-6'> <span className="login-name d-block">Last Name :</span>
//                             <input name="text" placeholder="Enter Your Last Name" className="p-2 mt-2 w-100" value={last_name} onChange={e => { setBilling_last_name(e.target.value) }} /></div>
//                     </div>
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Email :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_email(e.target.value) }} /></div>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Number :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_phone(e.target.value) }} /></div>
//                     </div>
//                     <span className="login-name mt-3 d-block">Your Address :</span>
//                     <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_address(e.target.value) }} />
//                     <span className="login-name mt-3 d-block">Your Address2 :</span>
//                     <input type="numeric" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_address_2(e.target.value) }} />
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name mt-3 d-block">City :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_city(e.target.value) }} /></div>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Your State :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_state(e.target.value) }} /></div>
//                     </div>
//                     <div className='row'>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Zip/ Postal code :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_pincode(e.target.value) }} /></div>
//                         <div className='col-6'><span className="login-name mt-3 d-block">Country :</span>
//                             <input type="text" placeholder="Enter Your Number" className="p-2 mt-2 w-100" value={phone} onChange={e => { setBilling_country(e.target.value) }} /></div>
//                     </div>
//                     {/* <div>  <input type="checkbox" onClick={(e) => setShipping_is_billing(!shipping_is_billing)} /> </div> */}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Personaldetails
