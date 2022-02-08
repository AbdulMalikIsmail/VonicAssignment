import React, { useState, useEffect, useRef } from 'react';
import Drawer from '../../components/Drawer'
import OrderCard from '../../components/OrderCard'
import Grid from '@material-ui/core/Grid';
import Footer from '../../components/PaymentFooter'
import OrderModal from '../../components/OrderModal'
import { useMutation, useQuery } from "react-query";
import * as OrderPageAPIs from "./api";

const OrderDetails = ({

}) => {

  const [orders, setOrders] = useState([])
 
  const {
    refetch: getOrders,
    data: ordersList,
    // isSuccess: isSuccessTasks,
    // isError: isErrorTask,
    // error: getTasksError,
    // isLoading: isLoadingTask,
  } = useQuery("orders", () => OrderPageAPIs.fetchOrder() ,{
    enabled: true,
    refetchOnWindowFocus: false,
  });


  useEffect(() => {
    if (ordersList && ordersList.length > 0){
      setOrders(ordersList)
    }
  },[ordersList])

  return (
    <Drawer>
      <Grid container >
        {
          orders.map((order, index) => <OrderCard key={index} order={order} />)
        }
      </Grid>
    </Drawer>
  );
}

export default OrderDetails
