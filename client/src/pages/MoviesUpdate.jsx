import React, { useState, useEffect } from "react";
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

export default function MoviesUpdate(props) {
  const [state, setState] = useState({
    id: props.match.params.id,
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

  const handleUpdateMovie = () => {
    const { id, name, rating, time } = state;
    const arrayTime = time.split("/");
    const payload = { name, rating, time: arrayTime };
    console.log(state, props, id);
    api.updateMovieById(id, payload).then(res => {
      window.alert(`Movie updated successfully`);
      // setState({ name: "", rating: "", time: "" });
    });
  };

  useEffect(() => {
    const { id } = state;
    api.getMovieById(id).then(movie => {
      setState({
        ...state,
        name: movie.data.data.name,
        rating: movie.data.data.rating,
        time: movie.data.data.time.join("/")
      });
    });
    return () => {
      console.log("cleanup");
    };
  }, []);

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
      <Button onClick={handleUpdateMovie}>Update Movie</Button>
      <CancelButton href={"/"}>Cancel</CancelButton>
    </Wrapper>
  );
}
