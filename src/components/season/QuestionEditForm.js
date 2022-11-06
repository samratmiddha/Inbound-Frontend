import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackendClient from "../../BackendClient";
import { FormControl, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function EditQuestionForm(props) {
  const users = useSelector((state) => state.userList.userListData);
  const question = useSelector((state) => state.questionEditModal.questionData);
  // const [sectionId, setSectionId] = useState(props.sectionId);

  // setSectionId(props.sectionId);
  let asignee_array = [];
  for (var x in question.asignee) {
    asignee_array.push(question.asignee[x].username);
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      section: question.section.id,
      asignee: asignee_array,
      question_name: question.question_name,
      question_text: question.question_text,
    },
  });
  const onSubmit = (data) => {
    console.log("exe2", data);
    BackendClient.patch("questions/" + question.id + "/", data);
  };

  //   const handleChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setPersonName(
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="question_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="name"
              size="small"
              margin="normal"
              {...field}
            />
          )}
        />

        {errors.question_text && (
          <div class="error">This field is required</div>
        )}
        <br />
        <Controller
          name="section"
          control={control}
          render={({ field }) => <></>}
        />
        <Controller
          name="question_text"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Question"
              size="small"
              margin="normal"
              {...field}
            />
          )}
        />

        {errors.question_text && (
          <div class="error">This field is required</div>
        )}
        <br />
        <Controller
          name="asignee"
          control={control}
          label="Asignees"
          render={({ field }) => (
            <FormControl>
              <Select
                {...field}
                labelId="asignees"
                label="asignees"
                multiple
                size="small"
              >
                {users.map((user, id) => {
                  if (user.name != null) {
                    return (
                      <MenuItem value={user.username} key={user.username}>
                        {user.name}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          )}
        />
        <br></br>
        <input type="submit" value="commit" />
      </form>
      {console.log("aye haye", props.sectionId)}
    </div>
  );
}
