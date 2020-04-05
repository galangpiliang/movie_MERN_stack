import React, { useState } from "react";
import api from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1"
})``;

const Wrapper = styled.div.attrs({
  className: "form-group"
})`
  margin: 0 30px;
`;
const Label = styled.label`
  margin: 5px;
`;
const InputText = styled.input.attrs({
  className: "form-control"
})`
  margin: 5px;
`;
const Button = styled.button.attrs({
  className: "btn btn-primary"
})`
  margin: 15px;
`;
const CancelButton = styled.a.attrs({
  className: "btn btn-danger"
})`
  margin: 15px;
`;

export default function MoviesInsert() {
  const [state, setState] = useState({
    name: "",
    rating: "",
    time: ""
  });

  const handleChangeInputName = e => {
    const name = e.target.value;
    setState({ ...state, name });
  };

  const handleChangeInputTime = e => {
    const time = e.target.value;
    setState({ ...state, time });
  };

  const handleChangeInputRating = e => {
    const rating = e.target.validity.valid ? e.target.value : state.rating;
    setState({ ...state, rating });
  };

  const handleIncludeMovie = () => {
    const { name, rating, time } = state;
    const arrayTime = time.split("/");
    const payload = { name, rating, time: arrayTime };

    api.insertMovie(payload).then(res => {
      window.alert(`Movie inserted successfully`);
      setState({ name: "", rating: "", time: "" });
    });
  };

  const { name, rating, time } = state;
  return (
    <Wrapper>
      <Title>Create Movie</Title>
      <Label>Name: </Label>
      <InputText type="text" value={name} onChange={handleChangeInputName} />
      <Label>Rating: </Label>
      <InputText
        type="number"
        step="0.1"
        lang="en-US"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={rating}
        onChange={handleChangeInputRating}
      />
      <Label>Time: </Label>
      <InputText type="text" value={time} onChange={handleChangeInputTime} />
      <Button onClick={handleIncludeMovie}>Add Movie</Button>
      <CancelButton href={"/"}>Cancel</CancelButton>
    </Wrapper>
  );
}
