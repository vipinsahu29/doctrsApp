import React from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  parPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / parPage);
  let startPage = pageNumber;

  let dif = totalPage - pageNumber;
  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  return (
    <ul className="flex gap-3">
      {
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          className={`w-[63px] h-[43px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] ${
            pageNumber < 2 ? "cursor-not-allowed" : "cursor-pointer"
          } }`}
          disabled={pageNumber < 2}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
      }
      <input
        className="w-[63px] h-[43px] rounded-full fix bg-slate-300 text-[#000000] cursor-pointer font-semibold text-center text-lg"
        onChange={(e) =>
          setPageNumber(
            Number(e.target.value <= endPage ? e.target.value : endPage)
          )
        }
        type="number"
        value={pageNumber > 0 ? pageNumber : ""}
      ></input>
      {
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          className={`w-[63px] h-[43px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000]  ${
            pageNumber >= endPage && pageNumber > 0
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={pageNumber >= endPage && pageNumber > 0}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      }
    </ul>
  );
};

export default Pagination;
