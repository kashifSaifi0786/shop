import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";

export default function DataTable({ data: shops, handleDelete }) {
  const columns = [
    { field: "name", headerName: "Shop" },
    { field: "area", headerName: "Area" },
    {
      field: "category",
      headerName: "Category",
    },
    { field: "openDate", headerName: "Opening Date", width: 150 },
    { field: "closeDate", headerName: "Closing Date", width: 150 },
    {
      field: "status",
      headerName: "Opening Status",
      renderCell: (params) => {
        const { openDate, closeDate } = params.row;
        const date = new Date();
        const status = date > openDate && date < closeDate ? true : false;
        return <Chip label={status ? "Open" : "Close"} />;
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/shop/${params.row.id}`}>
            <Button variant="contained">Edit</Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        const handleClick = (e) => {
          e.stopPropagation();
          handleDelete(params.row.id);
        };
        return (
          <Button
            sx={{ bgcolor: "red", "&:hover": { bgcolor: "red" } }}
            variant="contained"
            onClick={handleClick}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <Link to={"/shop/new"}>
          <Button variant="contained">Add Shop</Button>
        </Link>
      </Box>
      <Box sx={{ height: 400, mt: 5 }}>
        <DataGrid
          rows={shops}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
}
