import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, editFormItem, isFormValidated } from "../../redux/reducer";
import { darkBG, lightBG } from "../../util/config";

export default (props) => {
  const { value, closeModal } = props;
  const [formValue, setFormValue] = useState({
    id: value ? value.id : Math.floor(Math.random() * 1000),
    Image: value ? value.Image : "",
    userName: value ? value.userName : "",
    Email: value ? value.Email : "",
    Telephone: value ? value?.Telephone : "",
    Website: value ? value?.Website : "",
    Role: value ? value.Role : null,
  });

  const dispatch = useDispatch();
  const backGround = useSelector((state) => state.app.bgColor);
  const validation = useSelector((state) => state.app.isValidated);
  const emi = useSelector((state) => state.app.details);
  const [duplicateItem, setDuplicateItem] = useState({});
  const location = useLocation();
  const dashBoardData = useSelector((state) => state.app.details);
  const navigate = useNavigate();

 
  const changeHandler = (event, name) => {
    if (event) {
      dispatch(isFormValidated(false));
      const matchingItems = dashBoardData.filter((item) => {
        return item[name] === event && name !== "Role";
      });

      if (matchingItems.length > 0) {
        setDuplicateItem({
          ...duplicateItem,
          [name]: event,
        });
      } else {
        setDuplicateItem({
          ...duplicateItem,
          [name]: null,
        });
      }
    }

    setFormValue({ ...formValue, [name]: event });
  };

  const editHandler = () => {
    dispatch(editFormItem({ data: formValue }));
    closeModal();
  };
  const submitHandler = () => {
    if (
      !formValue.Website ||
      !formValue.userName ||
      !formValue.Role ||
      !formValue.Email ||
      !formValue.Telephone
    ) {
      dispatch(isFormValidated(true));
      return;
    }
    dispatch(addDetails({ data: formValue }));
    navigate("/dashboard");
    setFormValue({
      Name: "",
      Email: "",
      userName: "",
      Role: null,
      Image: "",
      website: "",
    });
  };

  const typeChecking = (type) => {
    switch (type) {
      case "TelePhone":
        return "number";
      case "Email":
        return "email";
      default:
        return null;
    }
  };

  const displayExistedError = (param) => {
    return (
      <span
        style={{
          color: backGround ? "#fff" : "darkred",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {param} already taken
      </span>
    );
  };
  const displayValidationError = (param) => {
    return (
      <span
        style={{
          color: backGround ? "#fff" : "darkred",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {param} Field is missing
      </span>
    );
  };
  const options = [
    {
      value: "Administrator",
      label: "Administrator",
    },
    {
      value: "User",
      label: "User",
    },
  ];

  return (
    <div className="form_container" style={backGround ? darkBG : lightBG}>
      <Form
        className={location.pathname === "/" ? "form_wrapper" : "modal_form"}
        style={backGround ? darkBG : lightBG}
      >
        {Object.keys(formValue)?.map((item) => {
          switch (item) {
            case "Role":
              return (
                <div
                  className={item}
                  id={backGround ? "darkBgSelect" : "lightBgSelect"}
                >
                  <Select
                    value={formValue[item]}
                    name={item}
                    allowClear
                    placeholder="Select User"
                    onChange={(e) => {
                      changeHandler(e, item);
                    }}
                    size={"large"}
                    options={options}
                  />
                  {!formValue[item] &&
                    validation &&
                    displayValidationError(item)}
                  {duplicateItem[item] && displayExistedError(formValue[item])}
                </div>
              );

            default:
              return (
                <div className={` item_wrapper ${item}`}>
                  <label
                    style={{
                      color: backGround ? "#fff" : "#ff4d4f",
                    }}
                  >
                    {item}
                  </label>
                  <Input
                    style={{
                      background: backGround ? "#333" : "",
                      border: backGround && "none",
                      borderBottom: backGround
                        ? "none "
                        : "1.5px solid #ff4d4f",
                    }}
                    className={backGround ? "inputdarkBg" : "inputLightBg"}
                    type={typeChecking(item)}
                    value={formValue[item]}
                    name={item}
                    onChange={(e) => {
                      changeHandler(e.target.value, item);
                    }}
                  />
                  {!formValue[item] &&
                    validation &&
                    displayValidationError(item)}
                  {duplicateItem[item] && displayExistedError(formValue[item])}
                </div>
              );
          }
        })}

        <Button
          type="primary"
          danger
          disabled={Object.values(duplicateItem).some((value) =>
            Boolean(value)
          )}
          style={backGround && { background: "#333" }}
          onClick={value ? editHandler : submitHandler}
        >
          SignUp
        </Button>
      </Form>
    </div>
  );
};
