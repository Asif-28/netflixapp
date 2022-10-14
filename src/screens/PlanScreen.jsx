import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

// THE DATABASE DATA COMING FROM THE FIREBASE DATBASE

const PlanScreen = () => {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    db.collection("products")
      // CHECK THE DATA WHICH IDS ACTIVE
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  //   console.log(products);
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        //Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console
        alert(`An error occured : ${error.message}`);
      }
      if (sessionId) {
        // We have a session , let's redirect to the checkout
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_51LquVQSB3xWfkoOtkVj984h6snHmzCwhtwbasPcVQKOPKZMoKz45UUM53u1VnHtJ1Op2x1JAYbXwvKUG9LWol7gm00JkagfZMc"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="planScreen">
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="planScreenPlan">
            <div className="planScreenInfo">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
