/* eslint-disable react/prop-types */
import Field from "../Field";
import { numberToWords } from "@persian-tools/persian-tools";

const InputForm = ({ handleChange, productFormData, priceNumInput }) => {
  const {
    url,
    title,
    description,
    image,
    price,
    attributes,
    weight,
    brand,
    category_title,
  } = productFormData;

  return (
    <>
      <Field
        isRequired
        label="عنوان"
        value={title}
        placeholder="عنوان محصول"
        style={{ border: "1px solid gray" }}
        name="title"
        onChange={handleChange}
      />
      <Field
        label="توضیحات"
        value={description}
        placeholder="توضیحات درباره محصول"
        style={{ border: "1px solid gray" }}
        name="description"
        onChange={handleChange}
      />
      <Field
        label="قیمت"
        isRequired
        value={price}
        reference={priceNumInput}
        type="number"
        maxLength="17"
        onKeyPress={price?.length == 16 && false}
        placeholder="قیمت محصول"
        style={{ border: "1px solid gray" }}
        name="price"
        onChange={handleChange}
        helper={`${price?.length ? `${numberToWords(price)} تومان` : ""}`}
      />
      <Field
        label="ویژگی ها"
        value={attributes}
        placeholder="ویژگی های محصول"
        style={{ border: "1px solid gray" }}
        name="attributes"
        onChange={handleChange}
      />
      <Field
        label="وزن"
        value={weight}
        placeholder="وزن محصول"
        style={{ border: "1px solid gray" }}
        name="weight"
        onChange={handleChange}
      />
      <Field
        label="برند"
        value={brand}
        placeholder="برند محصول"
        style={{ border: "1px solid gray" }}
        name="brand"
        onChange={handleChange}
      />
      <Field
        label="دسته بندی"
        isRequired
        value={category_title}
        placeholder="دسته بندی محصول"
        style={{ border: "1px solid gray" }}
        name="category_title"
        onChange={handleChange}
      />
      <Field
        label="URL"
        isRequired
        value={url}
        placeholder="آدرس اینترنتی محصول"
        style={{ border: "1px solid gray" }}
        name="url"
        onChange={handleChange}
      />

      <Field
        label="عکس محصول (url وارد نمایید!)"
        value={image}
        placeholder="آدرس اینترنتی محصول"
        style={{ border: "1px solid gray" }}
        name="image"
        onChange={handleChange}
      />
    </>
  );
};

export default InputForm;
