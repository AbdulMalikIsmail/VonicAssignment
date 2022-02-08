/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Drawer from '../../components/Drawer'
import ProductCard from '../../components/ProductCard'
import Grid from '@material-ui/core/Grid';
import Footer from '../../components/PaymentFooter'
import OrderModal from '../../components/OrderModal'
import { useMutation, useQuery } from "react-query";
import * as ProductPageAPIs from "./api";

const HomePage = ({

}) => {

  const [products, setProducts] = useState([])
 
  const {
    refetch: getProducts,
    data: productsList,
    // isSuccess: isSuccessTasks,
    // isError: isErrorTask,
    // error: getTasksError,
    // isLoading: isLoadingTask,
  } = useQuery("products", () => ProductPageAPIs.getProductsList() ,{
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const {
    data:orderPlaceSuccessfully,
    error,
    isError,
    isLoading,
    isSuccess,
    mutate: createOrder,
  } = useMutation((payload) => ProductPageAPIs.createOrder(payload))

  // useEffect(() => {
  //   getProducts();
  // }, []);

  useEffect(() => {
    if (productsList && productsList.length > 0){
      setProducts(productsList)
    }
  },[productsList])

  useEffect(() => {
    console.log(orderPlaceSuccessfully)
    if (orderPlaceSuccessfully){
      if (orderPlaceSuccessfully.status){
        alert(orderPlaceSuccessfully.error)
        productInfo.current = {}
      }else{
        alert(orderPlaceSuccessfully.error)
      }
    }
    
    handleClose()
  },[orderPlaceSuccessfully])

  const productInfo = useRef(null)
  const [open, setOpen] = React.useState(false);

  const [showFooter, setShowFooter] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProductInfo = (info) => {
    productInfo.current = { ...productInfo.current, ...info }
    // console.log('>>>>', productInfo.current)
    setShowFooter(isProductsSelected())
  }

  const isProductsSelected = () => {
    console.log(productInfo.current)
    return productInfo && productInfo.current && Object.values(productInfo.current).filter((quantity) => quantity > 0).length > 0 || false
  }

  const handlePlaceOrder = () => {
    handleOpen()
  }

  return (
    <Drawer>
      <Grid container >
        {
          products && products.map((product, index) => <ProductCard key={index} product={product} onQuantityChange={updateProductInfo} />)
        }
      </Grid>
        <OrderModal open={open} setOpen={setOpen} orderDetails={productInfo && productInfo.current || {}} createOrder={createOrder}/>
      { showFooter && <Footer onPlaceOrder={() => handlePlaceOrder()} />}
    </Drawer>
  );
}

export default HomePage
