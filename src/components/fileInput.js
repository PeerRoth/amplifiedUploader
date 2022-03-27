import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import StateTextFields from "./textInput";
import Storage from "@aws-amplify/storage";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import { useSubscription } from "./useSubscription";

const Input = styled("input")({ display: "none" });

export default function UploadButtons() {
  const [sessionEmail, setSessionEmail] = useState("");
  async function handleInputFile(event) {
    let submissionId = uuidv4();
    let inputFilename = event.target.value.substring(
      event.target.value.lastIndexOf("\\") + 1
    );
    let submissionUrl = "CLIENTS/" + submissionId + "/" + inputFilename;
    let inputFile = event.target.files[0];
    let { key } = await Storage.put(submissionUrl, inputFile);
    let logoEntry = {
      id: submissionId,
      url: key,
      email: sessionEmail,
      name: inputFilename,
    };
    try {
      let graphQLPut = await API.graphql(
        graphqlOperation(createTodo, { input: logoEntry })
      );
      console.log("GraphQL entry successful!");
      console.log(graphQLPut);
    } catch (error) {
      console.log("Error saving post", error);
    }
  }
  const subby = useSubscription("onUpdateTodo");
  const uploadInputDisabled =
    sessionEmail && typeof sessionEmail === "string" && sessionEmail.length > 0
      ? false
      : true;
  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contained-button-file">
          <Input
            disabled={uploadInputDisabled}
            onChange={handleInputFile}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <IconButton
            color={uploadInputDisabled ? "error" : "primary"}
            aria-label="upload picture"
            component="span"
          >
            <AddPhotoAlternateIcon />
          </IconButton>
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {uploadInputDisabled ? "-" : sessionEmail}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <StateTextFields value={sessionEmail} handler={setSessionEmail} />
      </div>
    </>
  );
}
