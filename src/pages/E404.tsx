import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const E404: React.FC = () => (
  <div style={{ display:'flex', minHeight: "100vh", justifyContent: 'center', alignItems: 'center'}}>
  <Result
    status="404"
    title="404"
    subTitle="Trang không tồn tại."
    extra={
      <Link to="/">
        <Button type="primary" >Trang chủ</Button>
      </Link>
    }
  />
  </div>
);

export default E404;