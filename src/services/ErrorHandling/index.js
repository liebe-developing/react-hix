const registerValidation = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "این فیلد اجباری است";
  }

  if (!values.email) {
    errors.email = "این فیلد اجباری است";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "ایمیل نامعتبر";
  }

  if (!values.mobile) {
    errors.mobile = "این فیلد اجباری است";
  }

  if (!values.password) {
    errors.password = "این فیلد اجباری است";
  }
  if (!values.repeat_password) {
    errors.samePassword = "این فیلد اجباری است";
  } else if (values.password !== values.repeat_password) {
    errors.samePassword = "لطفا رمز عبور یکسان وارد نمایید";
  }

  return errors;
};

export { registerValidation };
