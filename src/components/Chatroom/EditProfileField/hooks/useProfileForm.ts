import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { fetchCatsAsync, updateCatAsync } from "../../../../Redux/features/catsSlice";
import { setLoading } from "../../../../store/ui/actions";
import { ProfileInfo, PhotoData } from "../types";
import { INITIAL_PROFILE_STATE } from "../constants";

export const useProfileForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File>();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(
    INITIAL_PROFILE_STATE
  );
  const [dataChanged, setDataChanged] = useState<boolean>(false);

  useEffect(() => {
    console.log(profileInfo);

    if (profileInfo === INITIAL_PROFILE_STATE) setDataChanged(false);
    else setDataChanged(true);
  }, [photo, profileInfo]);

  useEffect(() => {
    dispatch(fetchCatsAsync()).unwrap()
  }, []);

  useEffect(() => {
    const name = localStorage.getItem('cat_name') || '';
    const breed = localStorage.getItem('breed') || '';
    const gender = localStorage.getItem('gender') || '';
    const target_weight = localStorage.getItem('target_weight') || '';
    const medical_history = localStorage.getItem('medical_history') || '';
    const dietary_restrictions = localStorage.getItem('dietary_restrictions') || '';
    setProfileInfo({...profileInfo, name, breed, gender, target_weight, medical_history, dietary_restrictions});
  }, [])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const isFormValid = (): boolean => {
    return !!(
      photo && Object.values(profileInfo).every((value) => value.trim() !== "")
    );
  };

  const handleInputChange = (field: keyof ProfileInfo) => (value: string) => {
    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = async () => {
    if (!isFormValid() || !photo) return;

    dispatch(setLoading(true));

    try {
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Array.from(new Uint8Array(arrayBuffer));

      const photoData: PhotoData = {
        buffer,
        mimetype: photo.type,
        originalname: photo.name,
      };

      await dispatch(
        updateCatAsync({
          data: { ...profileInfo, photo: photoData },
        })
      ).unwrap();

      navigate("/cat-assistant");
    } catch (error) {
      console.error("Failed to update cat profile:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    photo,
    profileInfo,
    dataChanged,
    handlePhotoChange,
    handleInputChange,
    handleProfileUpdate,
    isFormValid,
  };
};
