import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import { Button, Paper } from "@mui/material";
import { addNewRoom } from "../../redux/Slices/roomSlice";

export default function CreateRoomForm({ close }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { isLoading, isError } = useSelector((state) => state.room);
  //   console.log(isLoading, isError);

  async function onSubmit(data) {
    dispatch(addNewRoom({ ...data, image: data.image[0] }));

    console.log(data);
    if (!isError) {
      toast.success("item added sucessfully");
    }
  }
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError, isLoading]);

  function onError(error) {
    console.log(error);
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <form className=" " onSubmit={handleSubmit(onSubmit, onError)}>
        {/****************** Name*****************************/}
        <FormRow label="Cabin name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            register={{
              ...register("name", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** maximum capacity**************************/}

        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            register={{
              ...register("maxCapacity", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** regular price *****************************/}
        <FormRow label="Regular price" error={errors?.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            register={{
              ...register("regularPrice", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** Discount *****************************/}

        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            register={{
              ...register("discount", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        {/****************** Description *****************************/}
        <FormRow
          label="Description for website"
          error={errors?.description?.message}
        >
          <Input
            type="text"
            id="description"
            rows={3}
            register={{
              ...register("description", {
                required: "This Field is required",
                minLength: {
                  value: 10,
                  message: "The field shoul atleast contain length of 50",
                },
              }),
            }}
          />
        </FormRow>

        {/****************** Header Image *****************************/}

        <FormRow label="Cabin Photo" error={errors?.image?.message}>
          <FileInput
            id="image"
            register={{
              ...register("image", {
                required: "This Field is required",
              }),
            }}
          />
        </FormRow>

        <FormRow>
          <Button variant="outlined" color="error" onClick={() => close(false)}>
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Create new Place
          </Button>
        </FormRow>
      </form>
    </Paper>
  );
}
