import { useEffect, useState } from "react"
import type { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";

export default function Catalog() {
    //Define a state variable products, using useState
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //   //Function to fetch the data
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch('http://localhost:8081/api/products');
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch the data');
    //       }
    //       const data = await response.json();
    //       setProducts(data.content);
    //     } catch (error) {
    //       console.error('Error Fetching Data: ', error);
    //     }
    //   }
    //   fetchData();
    // }, []);
    // useEffect(() => {
    //     fetch('http://localhost:8081/api/products')
    //     .then(response => response.json())
    //     .then(data => setProducts(data.content));
    // }, []);
    useEffect(()=>{
        agent.Store.list()
        .then((products)=>setProducts(products.content))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
    }, []);
    
    if(loading) return <Spinner message='Loading Products...'/>
    if(!products) return <h3>Unable to load Products</h3>

    return (
        <>
            <ProductList products={products}/>
        </>
    )
}