import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getloginuser, Userreview } from '../../https/axios'

const ProductReview = (productid) => {

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [subject, setSubject] = useState('')
    const [userinfo, setUserinfo] = useState('')

    useEffect(() => {
        async function users() {
            const userdata = await getloginuser();
            setUserinfo(userdata.data.User.id)
        }
        users();
    }, [])

    const sendData = async () => {
        try {
            if (!review || !rating) {
                toast("Review Add Not Successfully", { theme: "dark", type: "error" })
            } else {
                const insertReating = await Userreview({ item_id: productid.productid, user_id: "63ca20226d1ecb526eb9cda4", review, rating, subject })
                if (insertReating) {
                    setReview('')
                    setRating('')
                    toast("Review Add successfully", { theme: "dark", type: "success" })
                }
            }
        } catch (error) {
            toast("Review not Add", { theme: "dark", type: "error" })
        }
    }


 
    return (
        <div className="tab-pane">
            <div className="form-review">
                <div className="-pro-review">
                    <p id="review">There are no reviews for this product.</p>
                    <h6 className="co-heading  mb-3">Write a review</h6>
               
                    <div className="form-group required mb-3">
                        <label htmlFor="input-name">Subject :</label>
                        <input type="text" name="name" id="input-name" value={subject} onChange={e => { setSubject(e.target.value) }} className="form-control" />
                    </div>
                    <div className="form-group required mb-3">
                        <label htmlFor="input-name">Your Review :</label>
                        <textarea name="text" rows="5" id="input-review" required value={review} onChange={e => { setReview(e.target.value) }} className="form-control"></textarea>
                    </div>
                    <div className="d-flex align-items-center">
                        <div>Rating  :</div>
                            <fieldset className="rate">
                                <input type="radio" id="star5" value={5} onClick={(e) => setRating(e.target.value)} /><label className="full" htmlFor="star5"></label>
                                <input type="radio" id="star4" value={4} onClick={(e) => setRating(e.target.value)} /><label className="full" htmlFor="star4"></label>
                                <input type="radio" id="star3" value={3} onClick={(e) => setRating(e.target.value)} /><label className="full" htmlFor="star3"></label>
                                <input type="radio" id="star2" value={2} onClick={(e) => setRating(e.target.value)} /><label className="full" htmlFor="star2"></label>
                                <input type="radio" id="star1" value={1} onClick={(e) => setRating(e.target.value)} /><label className="full" htmlFor="star1"></label>
                            </fieldset>
                      
                    </div>
                    <button onClick={sendData} className="button clearfix text-end">
                        <span className="btn">Continue</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductReview
