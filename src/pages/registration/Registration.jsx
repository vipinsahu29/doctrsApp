import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import AtomInput from "../../components/Atom/AtomInput";
import { registrationFields } from "../../Constants/constantUtil";
import { validateMobile } from "../../utility/util";
import Store from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  checkClinicExists,
  createClinic,
} from "./../../SupaBase/ClinicTableAPI";
const Registration = () => {
  const UID = Store((state) => state.UID);
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    DrName: "",
    ClinicName: "",
    Mobile: "",
    Specialization: "",
    Address: "",
  });
  const navigate = useNavigate();
  const [isMobileValid, setIsMobileValid] = useState(true);

  const [inputError, setInputError] = useState("");
  const isValidForm =
    !!formData.DrName &&
    !!formData.ClinicName &&
    !!formData.Mobile &&
    !!formData.Specialization &&
    !!formData.Address;
  useEffect(() => {
    const checkClinicExist = async () => {
      const isRegistered = await checkClinicExists(UID);
      if (isRegistered) {
        setOpen(false);
        navigate("/appointment_list");
      }
    };
    checkClinicExist();
  }, [UID, navigate]);
  const handleChange = (e) => {
    if (e.target.name === "Mobile") {
      setIsMobileValid(validateMobile(e.target.value));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    if (!inputError || isValidForm || isMobileValid) {
      const { clinic_data, clinic_error } = await createClinic(
        {
          name: formData.ClinicName,
          specialization: formData.Specialization,
          address: formData.Address,
          UUID: UID,
        },
        {
          name: formData.DrName,
          role: "doctor",
          status: "active",
          mobile: formData.Mobile,
          email: "dummyMail",
          clinic_id: null,
          UUID: UID,
        }
      );

      if (!clinic_error) {
        Store.getState().setClinicId(clinic_data[0]?.clinic_id);
        setOpen(false);
        navigate("/appointment_list");
      }
    }
  };
  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="w-full relative transform overflow-hidden rounded-lg bg-gray-600 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full max-w-4xl">
              <div className="sm:flex sm:items-start gap-2  justify-center items-center align-middle">
                <div className="mx-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-8">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>

                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-white"
                >
                  Complete registration first
                </DialogTitle>
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="my-4">
                  <p className="text-lg text-red-500">
                    Please fill all fields carefully and provide authenticated
                    data.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {registrationFields.map((field) => (
                    <div key={field.name}>
                      <AtomInput
                        label={field.label}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={handleChange}
                        type={field.type}
                        options={field.options}
                        required={field.required}
                        setError={setInputError}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSaveData}
                className={`${
                  inputError || !isValidForm || !isMobileValid
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-800 sm:ml-3 sm:w-auto`}
                disabled={inputError || !isValidForm || !isMobileValid}
              >
                Save and Continue
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Registration;
