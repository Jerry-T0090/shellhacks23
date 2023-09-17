import { Button } from "@suid/material";
import { TextInput, validators } from "./validation";
import { createFormControl, createFormGroup } from "solid-forms";
import { Checkbox } from "@suid/material";
import { Show, createSignal } from "solid-js";

const Signup = () => {
  const group = createFormGroup({
    firstName: createFormControl("First Name", {
      required: true,
      validators: validators.required,
    }),
    lastName: createFormControl("Last Name", {
      required: true,
      validators: validators.required,
    }),
    email: createFormControl("Email", {
      required: true,
      validators: [
        validators.required,
        validators.email,
        validators.emailExists,
      ],
    }),
    reEnterEmail: createFormControl("Reenter Email", {
      required: true,
      validators: [validators.required, validators.email],
    }),
  });

  const [supplier, setSupplier] = createSignal(false);
  const onSubmit = async () => {
    if (group.isSubmitted || !group.isValid) return;
    console.log(group.value);

    // Todo submit to DB
    // Submit to auth0
    // navigate to home page
  };

  return (
    <div class="flex flex-col gap-2 items-center self-center mt-40">
      <div
        onsubmit={onSubmit}
        class="flex flex-col gap-2 items-center self-center top-1/2"
      >
        <Show
          when={!supplier()}
          fallback={
            <div class="flex flex-col gap-2 items-center self-center top-1/2">
              <TextInput
                name="Organization Name"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Street Address"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="City"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="State"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Zip"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Website URL"
                control={group.controls.firstName}
              ></TextInput>
              <TextInput
                name="Description of Items"
                control={group.controls.firstName}
              ></TextInput>
              
            </div>
          }
        >
          <TextInput
            name="First Name"
            control={group.controls.firstName}
          ></TextInput>

          <TextInput
            name="Last Name"
            control={group.controls.lastName}
          ></TextInput>
        </Show>

        <TextInput name="Email" control={group.controls.email}></TextInput>

        <TextInput
          name="Reenter Email"
          control={group.controls.reEnterEmail}
        ></TextInput>

        <div class="flex gap-2 self-start items-center">
          Supplier
          <Checkbox class="my-2" onchange={() => setSupplier(!supplier())} />
        </div>
        <Show when={supplier()}>
          <div class="flex flex-col gap-2 items-center self-center top-1/2"></div>
        </Show>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="success"
          disabled={!group.isValid}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Signup;
