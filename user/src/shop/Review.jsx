import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Star from "./Star";
import { AllContext } from "../contexts/ContextProvider";

const reviwtitle = "Add a Review";

const notifyError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifyMsg = (msg) => {
  toast(msg, {
    position: toast.POSITION.TOP_CENTER,
  });
};
const notifySuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const Review = () => {
  const [ReviewShow, setReviewShow] = useState(true);
  const { id } = useParams();
  // const [User, setUser] = useState();
  const {User}=useContext(AllContext)
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9002/auth/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => console.log(error));
  }, [Product]);
  const result = Product.filter((p) => p._id === id);
  const { productDetails, productFeature, productImages, reviewList } =
    result[0] || {};
  const [Review, setReview] = useState({
    productId: id,
    userId: "",
    imgUrl: "",
    imgAlt: "Client thumb",
    name: "",
    email: "",
    rating: "",
    comment: "",
  });
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const { name, email, rating } = Review;
    if(User){
      Review.userId= User._id;
      Review.imgUrl=User.photoURL
    }
    if (rating === "Your Rating") {
      notifyError("Please Enter Ratings");
    } else {
      if (name && email) {
        axios
          .post("http://localhost:9002/auth/add/review", Review)
          .then((res) => {
            if (res.data.message === "Review added successfully") {
              notifySuccess(res.data.message);
            } else {
              notifyError(res.data.message);
            }
          });
      } else {
        notifyError("Please fill all the feild to add review");
      }
    }
  };

  return (
    <>
      <ul
        className={`review-nav lab-ul ${
          ReviewShow ? "RevActive" : "DescActive"
        }`}
      >
        <li className="desc" onClick={() => setReviewShow(!ReviewShow)}>
          Description
        </li>
        <li className="rev" onClick={() => setReviewShow(!ReviewShow)}>
          Reviews ({reviewList?.length})
        </li>
      </ul>

      {/* desc & review content */}
      <div
        className={`review-content ${
          ReviewShow ? "review-content-show" : "description-show"
        }`}
      >
        <div className="review-showing">
          {/* add review feild */}
          <div className="client-review">
            <div className="review-form">
              <div className="review-title">
                <h5>{reviwtitle}</h5>
              </div>
              <form className="row" onSubmit={handleSubmitReview}>
                <div className="col-md-4 col-12">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Full Name *"
                    onChange={(e) =>
                      setReview({ ...Review, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4 col-12">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your email address *"
                    onChange={(e) =>
                      setReview({ ...Review, email: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4 col-12">
                  <div className="rating">
                    <select
                      onChange={(e) =>
                        setReview({ ...Review, rating: e.target.value })
                      }
                    >
                      <option value={"Your Rating"}>Your Rating</option>
                      <option value={"1"}>1 star</option>
                      <option value={"2"}>2 star</option>
                      <option value={"3"}>3 star</option>
                      <option value={"4"}>4 star</option>
                      <option value={"5"}>5 star</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12 col-12">
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Type Here Your Message"
                    onChange={(e) =>
                      setReview({ ...Review, comment: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="default-button">
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ul className="content lab-ul">
            {reviewList &&
              reviewList.map((review, i) => (
                <li key={i}>
                  <div className="post-thumb">
                    <img src={review.imgUrl} alt="" />
                  </div>
                  <div className="post-content">
                    <div className="entry-meta">
                      <div className="posted-on">
                        <a href="#">{review.name}</a>
                        <p>{review.currentDateAndTime} </p>
                        <p> Given Review : <Star rating={Number(review.rating)} /> {review.rating}</p>
                      </div>
                    </div>
                    <div className="entry-content">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* desciption */}
        <div className="description">
          <p>{productDetails}</p>

          <div className="post-item">
            <div className="post-thumb">
              <img src={productImages} alt="" />
            </div>
            <div className="post-content">
              <ul className="lab-ul">
                {productFeature &&
                  productFeature.map((item, i) => (
                    <li key={i}>{item.feature}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
