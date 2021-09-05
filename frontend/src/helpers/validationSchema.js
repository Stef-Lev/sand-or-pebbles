import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string("Enter the beach title").required("Title is required"),
  location: Yup.string("Enter the beach location").required(
    "Location is required"
  ),
  description: Yup.string("Enter the beach description").max(
    280,
    "Description must be up to 280 characters"
  ),
  sandQuality: Yup.number().min(1).max(6),
  imageUrl: Yup.string("Enter the beach image").url("Please use a valid url"),
});

// Debugging backend validation
// const validationSchema = Yup.object().shape({
//     title: Yup.string(),
//     location: Yup.string(),
//     description: Yup.string(),
//     sandQuality: Yup.string(),
//     imageUrl: Yup.string(),
// });

export { validationSchema };
