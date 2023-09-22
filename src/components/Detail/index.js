import React, { useState } from "react";
import "./detail.css";
import { useDispatch, useSelector } from "react-redux";
import EmployeeForm from "../Form";
import { Modal, Popconfirm } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { deleteFormItem } from "../../redux/reducer";

const Index = ({ dataID, onClose }) => {
  const formData = useSelector((state) => state.app.details);
  const data = formData?.find((item) => item?.id === dataID);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteHandler = (value) => {
    dispatch(deleteFormItem(value));
    onClose();
  };

  const editHandler = (value) => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="detail-container">
      <div className="img-wrapper">
        <img src={data.Image} alt="avatar" />
        <span>{data.userName}</span>
      </div>
      <div>
        <span>Email Address</span>
        <span>{data.Email}</span>
      </div>
      <div>
        <span>Website</span>
        <span>{data.Website}</span>
      </div>
      <div>
        <span>Phone Number</span>
        <span>{data.Telephone}</span>
      </div>
      <div>
        <span>Role</span>
        <span>{data.Role}</span>
      </div>
      <div>
        <span>Actions</span>
        <div>
          <Popconfirm
            title="Delete User"
            description="Are you sure to delete this User?"
            disabled={formData?.[0].Role === "Administrator" && formData[0].id !== dataID? false : true}
            onConfirm={() => {
              if (data.Role === "Administrator" && formData[0].id !== dataID) {
                deleteHandler(data.id);
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteFilled
              className={`${
                formData?.[0].Role === "Administrator" && formData[0].id !== dataID? "" : "icon-disable"
              }`}
            />
          </Popconfirm>

          <EditFilled
            className={`${
              formData?.[0].Role === "Administrator" ? "" : "icon-disable"
            }`}
            onClick={() => {
              if (data.Role === "Administrator") {
                editHandler(dataID);
              }
            }}
          />

          {isModalOpen && (
            <Modal
              open={isModalOpen}
              footer={null}
              onCancel={handleCancel}
              
            >
              <EmployeeForm
                value={data}
                isModalOpen={isModalOpen}
                closeModal={() => {
                  setIsModalOpen(false);
                }}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
