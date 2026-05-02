import React, { useEffect } from "react";
import Store from "../../store/store";
import {
  UserClinicDetails,
  updateUserClinicDetails,
} from "../../SupaBase/UserClinicDetails";
import AtomInput from "../../components/Atom/AtomInput";
import { validateMobile } from "../../utility/util";

const Profile = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [clinicData, setClinicData] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [isMobileVaild, setIsMobileValid] = React.useState(true);
  const [error, setError] = React.useState(null);
  const clinicId = Store((state) => state.clinicId);
  const UUID = Store((state) => state.UID);

  useEffect(() => {
    const getDoctorsData = async () => {
      try {
        const response = await UserClinicDetails(clinicId);
        if (response.error) {
          console.error("Error fetching doctors data:", response.error);
          return;
        }
        setIsLoading(false);
        setClinicData(response.data);
        setFormData(response.data || {});
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };
    getDoctorsData();
  }, [clinicId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_mobile") {
      console.log("mobile-", value);
      setIsMobileValid(validateMobile(value));
    }
    console.log(name, value)
    console.log(formData)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(clinicData || {});
    setEdit(false);
    setError(null);
  };

  const handleSave = async () => {
    if (!clinicData?.user_id || !clinicData?.clinic_id) {
      console.error("Missing user_id or clinic_id for update");
      return;
    }
    if(!formData.user_name || !formData.user_mobile || !formData.clinic_address || !formData.clinic_name){
      setError("Fill all fields")
      return
    }
    if (!isMobileVaild) {
      setError("Please enter valid mobile number");
      return; // Prevent form submission if validation fails
    }
    setIsSaving(true);
    try {
      console.log("edit::", formData);
      const response = await updateUserClinicDetails({
        ...formData,
        UUID: UUID,
      });
      if (response.error) {
        console.error("Error saving profile:", response.error);
        return;
      }
      setClinicData(formData);
      setEdit(false);
      setError("")
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
      setError("")
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        Loading...
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 flex justify-center items-start pt-10 mt-16 mb-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Gradient */}
        <div className="h-24 bg-gradient-to-r from-blue-200 via-gray-200 to-yellow-100"></div>

        {/* Profile Section */}
        <div className="px-8 pb-8 -mt-20">
          <div className="flex items-center justify-between">
            {/* Left Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-16 h-16 rounded-full border-4 border-white shadow"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {clinicData?.user_name}
                </h2>
                <p className="text-sm text-gray-500">
                  {clinicData?.user_email}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex items-center gap-3">
              <button
                className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-600"
                onClick={() => {
                  if (edit) {
                    handleCancel();
                  } else {
                    setEdit(true);
                  }
                }}
                disabled={isSaving}
              >
                {edit ? "Cancel" : "Edit"}
              </button>
              <button
                className={`${
                  edit ? "block" : "hidden"
                } bg-green-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={handleSave}
                disabled={isSaving || !isMobileVaild}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Your First Name"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                value={formData?.user_name || ""}
                onChange={(e) => handleChange(e)}
                disabled={!edit || isSaving}
              />
            </div>

            {/* Clinic Name */}
            <div>
              <label className="text-sm text-gray-600">Clinic Name</label>
              <input
                type="text"
                name="clinic_name"
                placeholder="Your Clinic Name"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                value={formData?.clinic_name || ""}
                onChange={handleChange}
                disabled={!edit || isSaving}
              />
            </div>

            {/* Clinic Address */}
            <div>
              <label className="text-sm text-gray-600">Clinic Address</label>
              <input
                type="text"
                name="clinic_address"
                placeholder="Your Clinic Address"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                value={formData?.clinic_address || ""}
                onChange={handleChange}
                disabled={!edit || isSaving}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <select
                name="gender"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                value={formData?.gender || ""}
                onChange={handleChange}
                disabled={!edit || isSaving}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-gray-600" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="user_role"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                value={formData?.user_role || ""}
                onChange={handleChange}
                disabled={!edit || isSaving}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Compounder">Compounder</option>
                <option value="Chemist">Chemist</option>
              </select>
            </div>
            <div>
              <label className="absolute text-sm text-gray-600" htmlFor="user_mobile">
                Mobile Number
              </label>
              {/*<input
                type="number"
                name="mobile"
                placeholder="Your Mobile Number"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                maxLength="10"
                onChange={handleChange}
                disabled={!edit || isSaving}
                value={formData?.user_mobile || ""}
              />*/}
              <AtomInput
                  label="mobile"
                  name="user_mobile"
                  placeholder="XXXXX-XXXXX"
                  value={formData?.user_mobile || ""}
                  onChange={handleChange}
                  type="number"
                  required={true}
                  setError={setError}
                  disableInput={!edit || isSaving}
                />
              <p
                className={`text-xs mt-1 ${isMobileVaild && edit ? "text-green-500" : "text-red-500"}`}
              >
                {!isMobileVaild && "Please enter a valid 10-digit mobile number"}
              </p>
            </div>
            {/* Country */}
            <div>
              <label className="text-sm text-gray-600">Country</label>
              <select
                name="country"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                value={"India"}
                disabled={!edit || isSaving}
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option value="India">India</option>
              </select>
            </div>

            {/* Specialization */}
            <div>
              <label className="text-sm text-gray-600">Specialization</label>
              <input
                type="text"
                name="clinic_specialization"
                placeholder="Your specialization"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100"
                value={formData?.clinic_specialization || ""}
                onChange={handleChange}
                disabled={!edit || isSaving}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {/* Email Section */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700">
              My email Address
            </h3>

            <div className="mt-3 flex items-center justify-between bg-gray-50 border rounded-md px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full text-xs">
                  ✓
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    {clinicData?.user_email}
                  </p>
                  <p className="text-xs text-gray-700">
                    Registration Date:{"  "}
                    {clinicData?.clinic_created_at?.split("T")[0]}
                  </p>
                  <p className="text-xs text-gray-700">
                    Last login:{"  "}
                    {clinicData?.user_last_login?.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
