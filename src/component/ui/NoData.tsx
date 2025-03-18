import { Empty, Spin } from "antd";

export const NoData = (rows: object[]) => ({
  noRowsFallback: (
    <div className="no-data-table">
      <Spin spinning={rows.length == 0} size="large">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={"Không có dữ liệu"}
        />
      </Spin>
    </div>
  ),
});
