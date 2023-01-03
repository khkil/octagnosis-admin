import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const InspectionSelectPage = ({ history }) => {
  useEffect(() => {
    history.push("/admin");
  }, [])
  return null;
}

export default InspectionSelectPage;