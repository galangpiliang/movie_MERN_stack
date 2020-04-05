import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import api from "../api";

import styled from "styled-components";

import "react-table-6/react-table.css";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;
const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;
const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

const UpdateMovie = props => {
  const updateUser = e => {
    e.preventDefault();

    window.location.href = `/${props.id}`;
  };
  return <Update onClick={updateUser}>Update</Update>;
};

const DeleteMovie = props => {
  const deleteUser = e => {
    e.preventDefault();

    if (
      window.confirm(`Do you want to delete the movie ${props.id} permanently`)
    ) {
      api.deleteMovieById(props.id).then(() => {
        window.location.reload();
      });
    }
  };
  return <Delete onClick={deleteUser}>Delete</Delete>;
};

export default function MoviesList() {
  const [state, setState] = useState({
    movies: [],
    columns: [],
    isLoading: false
  });

  console.log(api.getAllMovies());

  useEffect(() => {
    setState({ ...state, isLoading: true });
    api.getAllMovies().then(movies => {
      setState({
        ...state,
        movies: movies.data.data,
        isLoading: false
      });
      console.log(movies.data.data);
    });
    return () => {
      console.log("cleanup");
    };
  }, []);

  const { movies, isLoading } = state;
  console.log("TCL: MovieList -> render -> movies", movies);

  const columns = [
    {
      Header: "ID",
      accessor: "_id",
      filterable: true
    },
    {
      Header: "Name",
      accessor: "name",
      filterable: true
    },
    {
      Header: "Rating",
      accessor: "rating",
      filterable: true
    },
    {
      Header: "Time",
      accessor: "time",
      Cell: props => <span>{props.value.join(" / ")}</span>
    },
    {
      Header: "",
      accessor: "",
      Cell: props => {
        return (
          <span>
            <DeleteMovie id={props.original._id} />{" "}
          </span>
        );
      }
    },
    {
      Header: "",
      accessor: "",
      Cell: props => {
        return (
          <span>
            <UpdateMovie id={props.original._id} />{" "}
          </span>
        );
      }
    }
  ];

  let showTable = true;
  if (!movies.length) {
    showTable = false;
  }

  return (
    <Wrapper>
      {showTable && (
        <ReactTable
          data={movies}
          columns={columns}
          loading={isLoading}
          defaultPageSize={5}
          showPageSizeOptions={true}
          minRows={0}
        />
      )}
    </Wrapper>
  );
}
