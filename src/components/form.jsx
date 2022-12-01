import React, { useState, useEffect } from "react";
import { Box, FormControl, TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import SelectDrop from "./common/Select";
import DatePicker from "./DatePicker";
import { areas, categories } from "../dummyData";
import { Schema, nameSchema, areaSchema, categorySchema } from "../formSchema";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/form.css";

const Form = ({ data: shops, handleAdd, handleUpdate }) => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [openDate, setOpenDate] = useState(dayjs("2014-08-18T21:11:54"));
  const [closeDate, setCloseDate] = useState(dayjs("2014-08-18T21:11:54"));
  const [err, setErr] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const shopId = parseInt(location.pathname.split("/")[2]);
  const shop = shops.filter((sh) => sh.id === shopId);

  useEffect(() => {
    if (shopId && shopId !== "new") {
      const { name, area, category, openDate, closeDate } = shop[0];
      setName(name);
      setArea(area);
      setCategory(category);
      setOpenDate(dayjs(openDate));
      setCloseDate(dayjs(closeDate));
    }
  }, []);
  const handleName = (e) => {
    const { name, value } = e.target;
    setName(value);
    const error = validateInput({ name, value }, nameSchema);
    if (error) {
      setErr((err) => ({
        ...err,
        [name]: error,
      }));
    } else {
      setErr((err) => ({
        ...err,
        [name]: "",
      }));
    }
  };

  const handleArea = (e) => {
    const { name, value } = e.target;
    setArea(value);
    const error = validateInput({ name, value }, areaSchema);
    if (error) {
      setErr((err) => ({
        ...err,
        [name]: error,
      }));
    } else {
      setErr((err) => ({
        ...err,
        [name]: "",
      }));
    }
  };
  const handleCat = (e) => {
    const { name, value } = e.target;
    setCategory(value);
    const error = validateInput({ name, value }, categorySchema);
    if (error) {
      setErr((err) => ({
        ...err,
        [name]: error,
      }));
    } else {
      setErr((err) => ({
        ...err,
        [name]: "",
      }));
    }
  };

  const handleOpenDate = (newValue) => {
    setOpenDate(newValue);
  };
  const handleCloseDate = (value) => {
    setCloseDate(value);
  };

  const validateInput = ({ name, value: string }, schema) => {
    const obj = { [name]: string };

    const { error } = schema.validate(obj);
    if (error) {
      return error.details[0].message;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      name,
      area,
      category,
      openDate: openDate?.toString(),
      closeDate: closeDate?.toString(),
    };
    const { error } = Schema.validate(obj, { abortEarly: false });
    if (error) {
      error.details.forEach((err) => {
        const { message, path } = err;
        setErr((errors) => ({
          ...errors,
          [path[0]]: message,
        }));
      });
      return;
    }
    if (openDate >= closeDate) {
      setErr((errors) => ({
        ...errors,
        closeDate: "Close Date must be greater than Open Date",
      }));
      return;
    } else {
      setErr((errors) => ({
        ...errors,
        closeDate: "",
      }));
    }

    // Submitting form
    if (shopId) {
      if (shopId === "new") {
        handleAdd({
          name,
          area,
          category,
          openDate: openDate.toISOString(),
          closeDate: closeDate.toISOString(),
        });
      } else {
        handleUpdate({
          id: shopId,
          name,
          area,
          category,
          openDate: openDate,
          closeDate: closeDate,
        });
      }
    }
    navigate("/");
  };

  return (
    <div className="formWrapper">
      <Box
        className="formContainer"
        sx={{
          p: 2,
          borderRadius: 1,
        }}
      >
        <h1>Fill Shop Details here</h1>
        <TextField
          name="name"
          label="Shop Name"
          value={name}
          onChange={handleName}
          fullWidth
          error={err.name ? true : false}
          helperText={err.name ? err.name : ""}
        />
        <SelectDrop
          name="area"
          label="Area"
          value={area}
          handleChange={handleArea}
          options={areas}
          error={err.area ? true : false}
          helperText={err.area ? err.area : ""}
        />
        <SelectDrop
          name="category"
          label="Category"
          value={category}
          handleChange={handleCat}
          options={categories}
          error={err.category ? true : false}
          helperText={err.category ? err.category : ""}
        />
        <FormControl fullWidth>
          <DatePicker
            name="openDate"
            label="Opening Date"
            value={openDate}
            handleChange={handleOpenDate}
            error={err.openDate ? true : false}
            helperText={err.openDate ? err.openDate : ""}
          />
        </FormControl>
        <FormControl fullWidth>
          <DatePicker
            name="closeDate"
            label="Closing Date"
            value={closeDate}
            handleChange={handleCloseDate}
            error={err.closeDate ? true : false}
            helperText={err.closeDate ? err.closeDate : ""}
          />
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </div>
  );
};

export default Form;
