import { useEffect, useState } from "react"
import type { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";
import { Grid, Paper, TextField } from "@mui/material";

export default function Catalog() {
    //Define a state variable products, using useState
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState("asc");
    const [selectedBrandId, setSelectedBrandId] = useState(0);
    const [selectedTypeId, setSelectedTypeId] = useState(0);
    const pageSize = 10;
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

    const loadProducts = (selectedSort, searchKeyword='') => {
        setLoading(true);
        let page = currentPage -1;
        let size = pageSize;
        let brandId = selectedBrandId !==0 ? selectedBrandId : undefined;
        let typeId = selectedTypeId !==0 ? selectedTypeId : undefined;
        const sort = "name";
        const order = selectedSort === "desc" ? "desc" : "asc"; 
        //construct the url
        let url = `${agent.Store.apiUrl}?sort=${sort}&order=${order}`;
        if(brandId !== undefined || typeId !== undefined){
        url+='&';
        if(brandId!== undefined) url += `brandId=${brandId}&`;
        if(typeId!== undefined) url += `typeId=${typeId}&`;
        //Remove trailing &
        url = url.replace(/&$/, "");
        }
    }
    
    if(loading) return <Spinner message='Loading Products...'/>
    if(!products) return <h3>Unable to load Products</h3>

    return (
        <Grid container spacing={4}>
            <Grid size={{xs: 3}}>
                <Paper sx={{mb:2}}>
                <TextField 
                    label="Search products" 
                    variant="outlined" 
                    fullWidth 
                    // value={searchTerm} 
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter') {
                    //     // Trigger search action
                    //     loadProducts(selectedSort, searchTerm); // Pass the search term to loadProducts
                    //     }
                    // }}
                />
                </Paper>
            </Grid>
            <Grid size={{xs: 9}}>
                <ProductList products={products}/>
            </Grid>
        </Grid>
    )
}