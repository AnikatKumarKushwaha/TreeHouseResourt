import supabase from "./supabase";

export const getBookings = async (sortValue, filter, from, to) => {
  const [field, direction] = sortValue.split("-");

  if (
    sortValue === undefined &&
    filter === undefined &&
    from === undefined &&
    to === undefined
  ) {
    return;
  }

  if (filter !== "all") {
    let {
      data: bookings,
      error,
      count,
    } = await supabase
      .from("bookings")
      .select("*, cabins(name),guests(fullName,email)", { count: "exact" })
      .eq("status", filter)
      .order(field, { ascending: direction === "asc" })
      .range(from, to);

    if (error) {
      console.log(error);
      throw new Error("Cannot make a booking");
    }

    return { bookings, count };
  } else {
    let {
      data: bookings,
      error,
      count,
    } = await supabase
      .from("bookings")
      .select("*, cabins(name),guests(fullName,email)", { count: "exact" })

      .order(field, { ascending: direction === "asc" })
      .range(from, to);

    if (error) {
      console.log(error);
      throw new Error("Cannot make a booking");
    }

    return { bookings, count };
  }
};

export async function getBooking(id) {
  let { data: booking, error } = await supabase
    .from("bookings")
    .select("*,cabins(*),guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Cannot make a booking");
  }

  return booking;
}

export async function updateBooking({ id, newData }) {
  const { data, error } = await supabase
    .from("bookings")
    .update(newData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Cannot not update booking");
  }

  return data;
}

//delete booking

export async function deleteBooking(id) {
  console.log(id);
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cannot not delete booking");
  }

  return id;
}

export async function getBookingWithoutFilter() {
  let { data: bookings, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cannot not get booking");
  }

  return bookings;
}
