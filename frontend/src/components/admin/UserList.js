import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import MetaData from "../layouts/MetaData";

export default function UserList() {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const setUsers = () => {
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
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Created At",
          field: "createdAt",
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

    users.forEach((user) => {
      // Convert createdAt to a Date object and format it to dd/mm/yyyy hh:mm:ss
      const formattedDateTime = new Date(user.createdAt).toLocaleString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      );

      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: formattedDateTime,
        role: user.role,
        actions: (
          <Fragment>
            <Link to={`/admin/user/${user._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, user._id)}
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
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: "top-right",
        type: "error",
        theme: "dark",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isUserDeleted) {
      toast("User Deleted Succesfully!", {
        type: "success",
        position: "top-right",
        onOpen: () => dispatch(clearUserDeleted()),
      });
      return;
    }
    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Users List</h1>
        <Fragment>
          <MetaData title='User List'/>

          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setUsers()}
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
