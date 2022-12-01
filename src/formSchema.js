import Joi from "joi";

export const Schema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[a-z A-Z]{1,30}$"))
    .required()
    .label("Shop Name"),
  area: Joi.string().required().label("Area"),
  category: Joi.string().required().label("Category"),
  openDate: Joi.date().required().label("Open Date"),
  closeDate: Joi.date().required().label("Close Date"),
});

export const nameSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]{1,30}$"))
    .required()
    .label("Shop Name"),
});

export const areaSchema = Joi.object({
  area: Joi.required().label("Area"),
});
export const categorySchema = Joi.object({
  category: Joi.required().label("Category"),
});
export const openDateSchema = Joi.object({
  openDate: Joi.date().required().label("Open Date"),
});
export const closeDateSchema = Joi.object({
  closeDate: Joi.required().label("Close Date"),
});
