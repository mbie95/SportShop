import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";
import type { Order } from "../../app/models/order";

export default function Order(){
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {        
        agent.Order.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner message="Loading orders..."/>
    
    function formatDate(orderDate: any) {
        if (orderDate.length < 3) {
            return "Invalid Date";
        }
        const formattedDate = `${orderDate.slice(8,10)}-${orderDate.slice(5,7)}-${orderDate.slice(0,4)}`;
        return formattedDate;
    }  
    
    
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>              
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{order.total}</TableCell>
                            <TableCell align="right">{formatDate(order.orderDate)}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>                
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
