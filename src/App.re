let useForm = () => {};

[@react.component]
let make = () => {
  useForm()->ignore;

  <div> <input /> </div>;
};