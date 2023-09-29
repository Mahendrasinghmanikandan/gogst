import moment from "moment";
import React from "react";

const SalesBillView = ({ currentData }) => {
  console.log(currentData);
  return (
    <div className="w-[100%]">
      <table className={`border-collapse  `}>
        <tbody className="w-full">
          <tr>
            <td colSpan={3} className=" p-2 w-[50%]">
              <div className="flex gap-x-4">
                <div className="flex flex-col">
                  <h1 className="uppercase font-bold text-sm">
                  Company Name
                  </h1>
                  <h1 className="text-[11px] font-semibold">
                    S.No. 647, TURKISH, KOREA EAST, UNITED STATE (TK),
                  </h1>
                  <h1 className="text-[11px] font-semibold">IRELAND - 6398629</h1>
                  <h1 className="text-[11px] font-semibold">
                    <span className="!font-bold">GSTIN</span> : 33ACRFS8535M1ZB
                  </h1>
                </div>
              </div>
            </td>
            <td colSpan={3} className="pl-4 w-[50%]">
              <div className="flex gap-x-10 justify-end">
                <div>
                  <div className="text-sm font-bold">Invoice No</div>
                  <div className="text-sm font-bold">Invoice Date</div>
                </div>

                <div className="flex gap-x-1">
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">:</div>
                    <div className="text-sm font-semibold">:</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {currentData?.invoice_number}
                    </div>
                    <div className="text-sm font-semibold">
                      {moment(currentData?.invoice_date).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
         
          <tr className="!w-full">
            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold">S.No.</div>
            </td>
            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold text-center">Product Name</div>
            </td>

            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold">Qty</div>
            </td>
            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold">Rate Per Unit</div>
            </td>
            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold">Amount</div>
            </td>
          </tr>
          {currentData?.items?.map((res, index) => {
            return (
              <tr key={index}>
                <td className="border border-slate-300 pl-4 p-1">
                  <div className="text-sm ">{index + 1}</div>
                </td>
                <td className="border border-slate-300 pl-4 p-1">
                  <div className="text-sm ">{res.product}</div>
                </td>

                <td className="border border-slate-300 pl-4 p-1">
                  <div className="text-sm ">{res.quantity}</div>
                </td>
                <td className="border border-slate-300 pl-4 p-1">
                  <div className="text-sm ">
                    {parseFloat(res.price).toFixed(2)}
                  </div>
                </td>
                <td className="border border-slate-300 pl-4 p-1">
                  <div className="text-sm">
                    {parseFloat(Number(res.quantity) * res.price).toFixed(2)}
                  </div>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={3} className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-semibold text-end">
                CGST Tax @ 2.5%
              </div>
            </td>
            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold"></div>
            </td>

            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm ">
                {parseFloat(
                  (_.sum(
                    currentData?.items?.map((data) => {
                      return data.price * Number(data.quantity);
                    })
                  ) /
                    100) *
                    2.5
                ).toFixed(2)}
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-semibold text-end">
                SGST Tax @ 2.5%
              </div>
            </td>
            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold"></div>
            </td>

            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm">
                {parseFloat(
                  (_.sum(
                    currentData?.items?.map((data) => {
                      return data.price * Number(data.quantity);
                    })
                  ) /
                    100) *
                    2.5
                ).toFixed(2)}
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold text-end">Grand Total</div>
            </td>
            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold">
                {_.sum(
                  currentData?.items?.map((data) => {
                    return Number(data.quantity);
                  })
                )}
              </div>
            </td>

            <td className="border border-slate-300 pl-4 p-1">
              <div className="text-sm font-bold">
                {parseFloat(
                  (_.sum(
                    currentData?.items?.map((data) => {
                      return data.price * Number(data.quantity);
                    })
                  ) /
                    100) *
                    2.5 *
                    2 +
                    _.sum(
                      currentData?.items?.map((data) => {
                        return data.price * Number(data.quantity);
                      })
                    )
                ).toFixed(2)}
              </div>
            </td>
          </tr>
          {/* <tr>
            <td colSpan={6} className="border border-slate-300 pl-1 p-2">
              <div className="flex justify-left pr-1 gap-x-10 ">
                <div className="flex gap-x-20">
                  <div>
                    <div className="text-sm font-bold">
                      Beneficiary Bank Name
                    </div>
                    <div className="text-sm font-bold">
                      Beneficiary Account No
                    </div>
                  </div>

                  <div className="flex gap-x-1">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold">:</div>
                      <div className="text-sm font-semibold">:</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        BANK OF BARODA
                      </div>
                      <div className="text-sm font-semibold">
                        25190500000472
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-20">
                  <div>
                    <div className="text-sm font-bold">
                      Beneficiary Bank IFSC
                    </div>
                    <div className="text-sm font-bold">
                      Beneficiary Acount Name
                    </div>
                  </div>

                  <div className="flex gap-x-1">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold">:</div>
                      <div className="text-sm font-semibold">:</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">BARB0KARURX</div>
                      <div className="text-sm font-semibold">
                        SRI BALAMALAI MURUGAN BLUEMETALS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={6} className="border border-slate-300 pl-1 pr-1">
              <div className="flex flex-row-reverse justify-between ">
                <div className="p-2 text-sm font-semibold">
                  For SRI BALAMALAI MURUGAN BLUEMETALS
                </div>
                <div className="p-2 text-sm font-semibold">
                  Customer&apos;s Seal And Signature
                </div>
              </div>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default SalesBillView;
