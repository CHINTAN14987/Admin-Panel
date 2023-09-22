import { Modal, Table } from "antd";
import React, { useState } from "react";
import "./table.css";
import { useSelector } from "react-redux";
import { darkBG, lightBG } from "../../util/config";
import Detail from "../Detail";

export default () => {
  const formData = useSelector((state) => state.app.details);
  const backGround = useSelector((state) => state.app.bgColor);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSelectedRowModalOpen, setIsSelectedRowModalOpen] = useState(false);

  const handleCancelDetailView = () => {
    setIsSelectedRowModalOpen(false);
  };
  const detailViewHandler = (value) => {
    setSelectedRow(value);
    setIsSelectedRowModalOpen(true);
  };
  const excluded = ["Role", "Image"];
  const columns = [
    ...Object.keys(formData[0])
      .filter((item) => excluded.indexOf(item) === -1)
      .map((item) => {
        return {
          title: item === "id" ? "ID" : item,
          dataIndex: item,
          id: item,
        };
      }),
  ];
  return (
    <div
      className={`employee-list-container ${
        backGround ? "DarkTableBg" : "lightTableBg"
      }`}
      style={backGround ? darkBG : lightBG}
    >
      {formData?.length ? (
        <div>
          <Table
            dataSource={formData}
            columns={columns}
            pagination={true}
            onRow={(record) => ({
              onClick: () => detailViewHandler(record.id),
            })}
          ></Table>
          {isSelectedRowModalOpen && (
            <Modal
              open={isSelectedRowModalOpen}
              footer={null}
              onCancel={handleCancelDetailView}
              bodyStyle={{ minHeight: 250 }}
              width={400}
            >
              <Detail
                dataID={selectedRow}
                onClose={() => {
                  setIsSelectedRowModalOpen(false);
                }}
              />
            </Modal>
          )}
        </div>
      ) : (
        <div className="">
          <h3 className="heading-wrapper-none">
            {" "}
            No Employees are in the List....
          </h3>
        </div>
      )}
    </div>
  );
};
