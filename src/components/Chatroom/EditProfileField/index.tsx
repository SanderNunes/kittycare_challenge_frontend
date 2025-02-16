import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";
import CancelModal from "./CancelModal";
import { useProfileForm } from "./hooks/useProfileForm";
import { BREED_OPTIONS, GENDER_OPTIONS } from "./constants";
import { ProfileInfo } from "./types";
import Header from "../../Header";
import { useSubscriptionCheck } from "../../../hooks/useSubscriptionCheck";

const EditProfileField = () => {
  useSubscriptionCheck();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    photo,
    profileInfo,
    dataChanged,
    handlePhotoChange,
    handleInputChange,
    handleProfileUpdate,
    isFormValid,
  } = useProfileForm();

  return (
    <div className="max-w-full sm:w-[1130px] p-2 pb-6 mx-auto">
      <Header />

      <main className="px-4">
        <section className="text-center mb-6">
          <h2 className="text-4xl font-bold capitalize mb-4">Edit Profile</h2>
          <h5 className="text-2xl font-medium w-full sm:w-[400px] mx-auto">
            Update your details to keep your profile current.
          </h5>
        </section>

        <section className="flex flex-col sm:flex-row justify-between gap-[30px] my-6">
          {/* Photo Upload Section */}
          <PhotoUploadSection photo={photo} onPhotoChange={handlePhotoChange} />

          {/* Form Fields Section */}
          <FormFieldsSection
            profileInfo={profileInfo}
            onInputChange={(field: keyof ProfileInfo) =>
              handleInputChange(field)
            }
          />
        </section>

        {/* Action Buttons */}
        <ActionButtons
          dataChanged={dataChanged}
          isFormValid={isFormValid()}
          onSave={handleProfileUpdate}
          onCancel={() => setIsModalOpen(true)}
        />
      </main>

      <CancelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
    </div>
  );
};

// Sub-components
const PhotoUploadSection = ({
  photo,
  onPhotoChange,
}: {
  photo?: File;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="w-full sm:w-[442px] m-auto flex flex-col gap-4">
    <label className="text-xl font-semibold text-center">Add Photo</label>
    <div className="w-full sm:w-[442px] h-[415px] relative">
      {photo ? (
        <img
          className="h-full w-full rounded-[20px] object-cover"
          src={URL.createObjectURL(photo)}
          alt="Selected cat"
        />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center bg-[#D1D6E2] bg-opacity-30 border-2 border-dashed rounded-[20px] border-[#898B90] border-opacity-30">
          <img className="m-3" src="/assets/svg/upload.svg" alt="upload icon" />
          <p className="text-xl font-medium m-1">Upload photo</p>
          <p className="text-base font-medium opacity-60">
            At least 256px X 256px
          </p>
          <p className="text-base font-medium opacity-60">PNG or JPG</p>
        </div>
      )}
      <input
        className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
        type="file"
        accept="image/*"
        onChange={onPhotoChange}
      />
    </div>
  </div>
);

const FormFieldsSection = ({
  profileInfo,
  onInputChange,
}: {
  profileInfo: ProfileInfo;
  onInputChange: (field: keyof ProfileInfo) => (value: string) => void;
}) => (
  <div className="w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
      <CustomInput
        label="Your cat's name"
        value={profileInfo.name}
        onChange={onInputChange("name")}
        placeholder="Enter your name"
      />
      <CustomDropdown
        label="Breed"
        options={[...BREED_OPTIONS]}
        selectedOption={profileInfo.breed}
        onSelect={onInputChange("breed")}
        placeholder="Select a breed"
      />
      <CustomDropdown
        label="Gender"
        options={[...GENDER_OPTIONS]}
        selectedOption={profileInfo.gender}
        onSelect={onInputChange("gender")}
        placeholder="Select gender"
      />
      <CustomInput
        label="Target Weight"
        value={profileInfo.target_weight}
        onChange={onInputChange("target_weight")}
        placeholder="Enter target weight"
        type="number"
      />
      <CustomTextArea
        label="Medical History"
        value={profileInfo.medical_history}
        onChange={onInputChange("medical_history")}
        placeholder="Enter medical history"
        rows={4}
      />
      <CustomTextArea
        label="Dietary Restrictions"
        value={profileInfo.dietary_restrictions}
        onChange={onInputChange("dietary_restrictions")}
        placeholder="Enter dietary preferences"
        rows={4}
      />
    </div>
  </div>
);

const ActionButtons = ({
  isFormValid,
  dataChanged,
  onSave,
  onCancel,
}: {
  dataChanged: boolean;
  isFormValid: boolean;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="flex gap-[10px] sm:gap-[30px] justify-start flex-col sm:flex-row-reverse">
    <button
      className={`h-[55px] px-[42px] py-[14px] rounded-[20px] border
        ${dataChanged && isFormValid
          ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
          : "bg-[#D1D6E2] text-[#898B90]"
        }`}
      onClick={onSave}
    >
      Save Profile
    </button>
    <button
      className="h-[55px] px-[42px] py-[14px] rounded-[20px] border border-[#898B90] text-[#898B90] hover:bg-[#dddddd]/70 active:bg-[#cccccc]"
      onClick={onCancel}
    >
      Cancel Subscription
    </button>
  </div>
);

export default EditProfileField;
