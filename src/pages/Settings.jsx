import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSetting, fetchSettings } from "../redux/Slices/settingSlice";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { Paper } from "@mui/material";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Uploader } from "../data/Uploader";

function Settings() {
  const { data, isLoading } = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  function handelChange(e, field) {
    const { value } = e.target;
    if (!value) return;
    dispatch(changeSetting({ [field]: value }));
  }

  console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <div className="font-bold text-3xl mb-2">Settings</div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <form>
            <FormRow label="Minimum Nights/booking">
              <Input
                type="number"
                id="min-nights"
                defaultValue={data.minBookingLength}
                onBlur={(e) => handelChange(e, "minBookingLength")}
              />
            </FormRow>
            <FormRow label="Maximum Nights/booking">
              <Input
                type="number"
                id="max-nights"
                defaultValue={data.maxBookingLength}
                onBlur={(e) => handelChange(e, "maxBookingLength")}
              />
            </FormRow>
            <FormRow label="Maximum guests/booking">
              <Input
                type="number"
                id="max-guests"
                defaultValue={data.maxGuestsPerBooking}
                onBlur={(e) => handelChange(e, "maxGuestsPerBooking")}
              />
            </FormRow>
            <FormRow label="Breakfast price">
              <Input
                type="number"
                id="breakfast-price"
                defaultValue={data.breakfastPrice}
                onBlur={(e) => handelChange(e, "breakfastPrice")}
              />
            </FormRow>
          </form>
        </Paper>
        <Uploader />
      </>
    );
  }
}

export default Settings;
