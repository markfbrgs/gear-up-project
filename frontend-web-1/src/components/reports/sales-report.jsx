import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import exportpdf from "../../assets/icons/export.png";
import MonthYearPicker from '../date-picker/date-picker';

const SalesReport = () => {
    const reportRef = useRef();

    const generatePDF = () => {
        const input = reportRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Determine number of pages
            const pageHeight = pdf.internal.pageSize.getHeight();
            let heightLeft = pdfHeight;
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            // Add more pages if content is longer than one page
            while (heightLeft > 0) {
                position -= pageHeight; // Move to the next page
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('Sales_Report.pdf');
        });
    };


    return (
        <>
            <div className='upper'>
                <MonthYearPicker />
                <button onClick={generatePDF} style={{ marginTop: '20px' }}>
                    <img src={exportpdf} alt="export-icon" />
                    Export
                </button>
            </div>

            <div ref={reportRef} className="pdf-content">
                <div className="upper-text" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1><span>ARON</span><span>BIKES</span></h1>
                    <p>Antipolo City</p>
                    <h3>Monthly Sales Report</h3>
                    <h6>(August 2024)</h6>
                    <p>Sales performance across different products.</p>
                </div>

                <div className='mt-4 mb-4'>
                    <p>Date generated:</p>
                    <p>Time generated:</p>
                    <p>Generated by:</p>
                </div>

                <div className='mb-4 fs-6'>
                    Total Sales : <b>999,999.00</b>
                </div>

                <div className='fs-6 fw-bold mb-3'>
                    Summary List of Items Sold
                </div>

                <table className='mb-4'>
                    <thead>
                        <tr>
                            <th >Item</th>
                            <th>Quantity</th>
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item Name</td>
                            <td>999</td>
                            <td>99,999.00</td>
                        </tr>
                    </tbody>
                </table>

                <div className='fs-6 fw-bold mb-3'>
                    Sales
                </div>

                <table>
                    <thead>
                        <tr>
                            <th >Day</th>
                            <th >Item</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Item Name</td>
                            <td>999</td>
                            <td className='text-end'>99,999.00</td>
                            <td className='text-end'>99,999.00</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default SalesReport;
