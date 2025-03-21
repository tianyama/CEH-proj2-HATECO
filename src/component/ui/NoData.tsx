import { Empty, Spin } from "antd";

export const NoData = (rows: object[]) => ({
  noRowsFallback: (
    <div style={{ textAlign: "center", gridColumn: "1/-1", alignSelf: "center" }}>
      <Spin spinning={rows.length == 0} size="large">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={"Không có dữ liệu"}
        />
      </Spin>
    </div>
  ),
});
