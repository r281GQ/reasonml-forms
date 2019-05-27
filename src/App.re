module type Config = {
  type state;
  type field;
  type formStatus;

  let defaultStatus: formStatus;
};

module Form = (Config: Config) => {
  type submission =
    | Submitting
    | NotSubmitting;

  type formProps = {
    values: Config.state,
    handleChange: Config.state => unit,
    status: Config.formStatus,
    isSubmitting: submission,
    handleSubmit: ReactEvent.Mouse.t => unit,
  };

  type action =
    | Update(Config.state);

  type formBag = {setStatus: Config.formStatus => unit};

  let useForm =
      (
        ~initialValues: Config.state,
        ~onSubmit: (Config.state, formBag) => unit,
      )
      : formProps => {
    let (state, dispatch) =
      React.useReducer(
        (_state, action) =>
          switch (action) {
          | Update(state) => state
          },
        initialValues,
      );

    let (formStatus, setFormStatus) =
      React.useState(() => Config.defaultStatus);
    {
      values: state,
      status: formStatus,
      isSubmitting: NotSubmitting,
      handleChange: state => dispatch(Update(state)),
      handleSubmit: _event => {
        onSubmit(state, {setStatus: status => setFormStatus(_ => status)});
      },
    };
  };
};

module MyForm = {
  type state = {
    username: string,
    password: string,
  };

  type field =
    | Username
    | Password;

  type formStatus =
    | Ok
    | Success
    | Error(string);

  module UserNameField = {
    let update = (state, value) => {...state, username: value};
  };

  module PassWordField = {
    let update = (state, value) => {...state, password: value};
    let validate = value => value->Js.String.includes("1");
  };

  let defaultStatus = Ok;
};

module LoginForm = Form(MyForm);

let d = () => {
  Js.Promise.(
    Fetch.fetch("https://jsonplaceholder.typicode.com/todos/1")
    |> then_(Fetch.Response.json)
    |> then_(x => {
         Js.log(x);
         Js.Promise.reject(Not_found);
       })
  );
};

[@react.component]
let make = () => {
  let form =
    LoginForm.useForm(
      ~initialValues={username: "sample", password: "pass"},
      ~onSubmit=(_values, form) =>
      Js.Promise.(
        d()
        |> then_(_x => {
             form.setStatus(MyForm.Success);
             resolve(" ");
           })
        |> catch(error => {
             form.setStatus(MyForm.Error("aint the case"));
             Js.log(error);
             resolve("");
           })
      )
      ->ignore
    );

  <div>
    <div>
      <input
        name="username"
        value={form.values.username}
        onChange={event =>
          form.handleChange(
            MyForm.UserNameField.update(
              form.values,
              event->ReactEvent.Form.target##value,
            ),
          )
        }
      />
    </div>
    <div>
      <input
        type_="password"
        name="password"
        onChange={event =>
          form.handleChange(
            MyForm.PassWordField.update(
              form.values,
              event->ReactEvent.Form.target##value,
            ),
          )
        }
        value={form.values.password}
      />
    </div>
    {switch (form.status) {
     | MyForm.Success => <div> "Good"->React.string </div>
     | MyForm.Error(_e) => <div> "Bad stuff happened"->React.string </div>
     | _ => React.null
     }}
    <div>
      <button onClick={form.handleSubmit}> "submit"->React.string </button>
    </div>
  </div>;
};