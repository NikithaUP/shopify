import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import {
  clearError,
  clearProductDeleted,
} from "../../slices/singleProductSlice";
import MetaData from "../layouts/MetaData";

export default function ProductList() {
  const { products = [], loading = true, error } = useSelector((state) => state.productsState);
  const { isProductDeleted ,error:productError } = useSelector((state) => state.singleProductState);

  const dispatch = useDispatch();

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, product._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        position: "top-right",
        type: "error",
        theme: "dark",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Succesfully!", {
        type: "success",
        position: "top-right",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }
    dispatch(getAdminProducts);
  }, [dispatch, error,isProductDeleted,productError]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Product List</h1>
        <Fragment>
          <MetaData title='Product List'/>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              responsive
              noBottomColumns={true}
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
