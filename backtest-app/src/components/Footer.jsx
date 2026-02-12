import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-8 text-center">
      <p className="text-sm mb-2">SEBI Regn No: INH200009935 | BSE Enlistment No. 5592 | CIN No.U74999TG2022PTC162657</p>
      <p className="text-sm mb-4">© Modern Algos Pvt. Ltd. All Rights Reserved.</p>
      <div className="flex justify-center gap-6 text-sm">
        <a href="#compliance" className="hover:text-green-400 transition">Compliance</a>
        <a href="#privacy" className="hover:text-green-400 transition">Privacy</a>
        <a href="#terms" className="hover:text-green-400 transition">Terms</a>
        <a href="#disclaimer" className="hover:text-green-400 transition">Disclaimer</a>
        <a href="#mitc" className="hover:text-green-400 transition">MITC</a>
      </div>
    </footer>
  );
};

export default Footer;
