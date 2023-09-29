import axios from 'axios';

// Token Status Checking
export const tokenStatusChecking =(formData)=> axios.get("/api/middleware");

// Logout
export const logoutUser =(formData)=> axios.delete("/api/middleware");


// authentication
export const createOrLoginUser =(formData)=> axios.post("/api/user",formData);


// vendors
export const createVendors =(formData)=> axios.post("/api/vendor",formData);
export const getAllVendors =(formData)=> axios.get("/api/vendor",formData);
export const deleteVendor =(id)=> axios.delete(`/api/vendor/${id}`);

// Products
export const createProducts =(formData)=> axios.post("/api/product",formData);
export const getAllProducts =(formData)=> axios.get("/api/product",formData);

// Constant
export const createCategory =(formData)=> axios.post("/api/category",formData);
export const createUnits =(formData)=> axios.post("/api/unit",formData);
export const createTax =(formData)=> axios.post("/api/tax",formData);

export const getAllCategory =(formData)=> axios.get("/api/category",formData);
export const getAllUnits =(formData)=> axios.get("/api/unit",formData);
export const getAllTax =(formData)=> axios.get("/api/tax",formData);

// Sales 
export const createSalesBill =(formData)=> axios.post("/api/sales",formData);
export const gellAllSalesBill =(formData)=> axios.get("/api/sales",formData);
export const deleteSalesBill =(formData)=> axios.put("/api/sales",formData);


// Purchase 
export const createPurchaseBill =(formData)=> axios.post("/api/purchase",formData);
export const gellAllPurchaseBill =(formData)=> axios.get("/api/purchase",formData);
export const deletePurchaseBill =(formData)=> axios.put("/api/purchase",formData);

