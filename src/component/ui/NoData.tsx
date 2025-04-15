import { Empty, Spin } from "antd";


export const NoData = (status: boolean) => ({
  noRowsFallback: (
    <div style={{ textAlign: "center", gridColumn: "1/-1", alignSelf: "center" }}>
      <Spin spinning={status} size="large">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={"Không có dữ liệu"}
        />
      </Spin>
    </div>
  ),
});
