import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import PropTypes from "prop-types";

const Pagination = ({ pageNumber, setPageNumber, total_page }) => {
  console.log("pagination",pageNumber, total_page);
  return (
    <ul className="flex gap-3">
      {
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          className={`w-[63px] h-[23px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] ${
            pageNumber < 2 ? "cursor-not-allowed" : "cursor-pointer"
          } }`}
          disabled={pageNumber < 2}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
      }
      <input
        className="w-[63px] h-[23px] rounded-full fix bg-slate-300 text-[#000000] cursor-pointer font-semibold text-center text-lg"
        onChange={(e) =>
          setPageNumber(
            Number(e.target.value <= total_page ? e.target.value : total_page)
          )
        }
        type="text"
        value={pageNumber > 0 ? pageNumber : ""}
      ></input>
      {
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          className={`w-[63px] h-[23px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000]  ${
            pageNumber >= total_page && pageNumber > 0
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={pageNumber >= total_page && pageNumber > 0}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      }
    </ul>
  );
};
export default Pagination;

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  total_page: PropTypes.number.isRequired,
};
