import React from 'react';
import ReportsList from '../../Components/Reports/ReportsList';
import ModalCreateReport from '../../Components/Modal/ModalCreateReport';

const ReportsPage = () => {

  return (
    <>
      <ReportsList/>
      <ModalCreateReport/>
    </>
  );
};

export default ReportsPage;