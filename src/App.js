import {  useEffect, useRef, useState } from "react";
import "./App.css";
import { getProducts } from "./API/Api";
import { ProductCard } from "./Components/ProductCard";
import { FavProduct } from "./Components/FavProduct";

function App() {
  const [product, setProduct] = useState(JSON.parse(localStorage.getItem('products')) || []);
  const [favProduct, setFavProduct] = useState(JSON.parse(localStorage.getItem('favProducts')) || [])
  const [visible, setVisible] = useState(false);
  const [err, setErr] = useState("");
  const checkedRef = useRef([]);  
  const [loading, setLoading] = useState(false);

  const handleChecked = (id)=>{
    let checked = checkedRef.current;
    let new_checked = []
    let flag = false;
    for (const each of checked){
      if(each !== id){
        new_checked.push(each)
      }else{
        flag = true;
      }
    }
    if(!flag){
      new_checked.push(id)
    }
    
    checkedRef.current = new_checked;
    
  }

  const handleFav = ()=>{
    let checked = checkedRef.current;
    if(checked.length > 0){
      let favPro = product.filter(item => checked.includes(item.id))
      setFavProduct([
        ...favProduct,
        ...favPro
      ])
      localStorage.setItem('favProducts', JSON.stringify([
        ...favProduct,
        ...favPro
      ]))
      handleDelete()
    }
  }
  const handleDelete = ()=>{
    let checked = checkedRef.current;
    if(checked.length > 0){
      let updatedValue = product.filter(item => !checked.includes(item.id))
      setProduct(updatedValue)
      localStorage.setItem('products', JSON.stringify(updatedValue));
      checkedRef.current = []
    }
    
  }
  const handleProduct = async () => {
    setLoading(true);
    let res = await getProducts();
    if (!res.issue) {
      localStorage.setItem('products', JSON.stringify(res.msg));
      setProduct(res.msg);
    } else {
      setErr(res.msg);
    }
    setLoading(false)
  };
  useEffect(() => {
    if(product.length === 0){
      handleProduct();
    }
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div className="wrapper">
       <div className="spinner">
       <div></div>   
       <div></div>    
       <div></div>    
       <div></div>    
       <div></div>    
       <div></div>    
       <div></div>    
       <div></div>    
       <div></div>    
       <div></div>    
     </div>
     </div>
      ) : (
        <>
          <button onClick={handleFav}>Add to Fav</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={()=> setVisible(!visible)}>{!visible ? "Favourite": "Home"} Products</button>
          <p>{err}</p>
          {!visible ? <div style={{ display: "flex", flexWrap: "wrap" }}>
            {product.length > 0 &&
              product.map((item) => <ProductCard key={item.id} handleChecked={handleChecked} {...item} />)}
          </div> :
          <div>
            {
              favProduct.length > 0 ? favProduct.map((item)=> <FavProduct {...item} />) : <h1>data not found!</h1>
            }
          </div> }
        </>
      )}
    </div>
  );
}

export default App;
