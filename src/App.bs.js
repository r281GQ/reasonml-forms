// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function Form(Config) {
  var useForm = function (initialValues, onSubmit) {
    var match = React.useReducer((function (_state, action) {
            return action[0];
          }), initialValues);
    var dispatch = match[1];
    var state = match[0];
    var match$1 = React.useState((function () {
            return Config[/* defaultStatus */0];
          }));
    var setFormStatus = match$1[1];
    return /* record */[
            /* values */state,
            /* handleChange */(function (state) {
                return Curry._1(dispatch, /* Update */[state]);
              }),
            /* status */match$1[0],
            /* isSubmitting : NotSubmitting */1,
            /* handleSubmit */(function (_event) {
                return Curry._2(onSubmit, state, /* record */[/* setStatus */(function (status) {
                                return Curry._1(setFormStatus, (function (param) {
                                              return status;
                                            }));
                              })]);
              })
          ];
  };
  return /* module */[/* useForm */useForm];
}

function update(state, value) {
  return /* record */[
          /* username */value,
          /* password */state[/* password */1]
        ];
}

var UserNameField = /* module */[/* update */update];

function update$1(state, value) {
  return /* record */[
          /* username */state[/* username */0],
          /* password */value
        ];
}

function validate(value) {
  return "1".includes(value);
}

var PassWordField = /* module */[
  /* update */update$1,
  /* validate */validate
];

var MyForm = /* module */[
  /* UserNameField */UserNameField,
  /* PassWordField */PassWordField,
  /* defaultStatus : Ok */0
];

function useForm(initialValues, onSubmit) {
  var match = React.useReducer((function (_state, action) {
          return action[0];
        }), initialValues);
  var dispatch = match[1];
  var state = match[0];
  var match$1 = React.useState((function () {
          return /* Ok */0;
        }));
  var setFormStatus = match$1[1];
  return /* record */[
          /* values */state,
          /* handleChange */(function (state) {
              return Curry._1(dispatch, /* Update */[state]);
            }),
          /* status */match$1[0],
          /* isSubmitting : NotSubmitting */1,
          /* handleSubmit */(function (_event) {
              return Curry._2(onSubmit, state, /* record */[/* setStatus */(function (status) {
                              return Curry._1(setFormStatus, (function (param) {
                                            return status;
                                          }));
                            })]);
            })
        ];
}

var LoginForm = /* module */[/* useForm */useForm];

function d(param) {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then((function (prim) {
                  return prim.json();
                })).then((function (x) {
                console.log(x);
                return Promise.reject(Caml_builtin_exceptions.not_found);
              }));
}

function App(Props) {
  var form = useForm(/* record */[
        /* username */"sample",
        /* password */"pass"
      ], (function (_values, form) {
          d(/* () */0).then((function (_x) {
                    Curry._1(form[/* setStatus */0], /* Success */1);
                    return Promise.resolve(" ");
                  })).catch((function (error) {
                  Curry._1(form[/* setStatus */0], /* Error */["aint the case"]);
                  console.log(error);
                  return Promise.resolve("");
                }));
          return /* () */0;
        }));
  var match = form[/* status */2];
  return React.createElement("div", undefined, React.createElement("div", undefined, React.createElement("input", {
                      name: "username",
                      value: form[/* values */0][/* username */0],
                      onChange: (function ($$event) {
                          return Curry._1(form[/* handleChange */1], update(form[/* values */0], $$event.target.value));
                        })
                    })), React.createElement("div", undefined, React.createElement("input", {
                      name: "password",
                      type: "password",
                      value: form[/* values */0][/* password */1],
                      onChange: (function ($$event) {
                          return Curry._1(form[/* handleChange */1], update$1(form[/* values */0], $$event.target.value));
                        })
                    })), typeof match === "number" ? (
                match !== 0 ? React.createElement("div", undefined, "Good") : null
              ) : React.createElement("div", undefined, "Bad stuff happened"), React.createElement("div", undefined, React.createElement("button", {
                      onClick: form[/* handleSubmit */4]
                    }, "submit")));
}

var make = App;

exports.Form = Form;
exports.MyForm = MyForm;
exports.LoginForm = LoginForm;
exports.d = d;
exports.make = make;
/* react Not a pure module */
