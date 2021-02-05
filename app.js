const express = require("express");
const app = express();
const dbconnection = require("./db/dbConnection");
const axios = require("axios");
const Movie = require("./db/movieModel");
const _ = require("lodash");

//API KEY -  61f19900
app.use(express.json());
dbconnection();

//searching the movie in database
app.get("/", async (req, res) => {
  const movieName = req.query.moviename;
  const result = await Movie.findOne({ title: movieName });
  if (_.isEmpty(result)) {
    try {
      const url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=61f19900";
      axios.get(url).then(async (response) => {
        const obj = {
          title: response.data.Title,
          year: response.data.Year,
          rating: response.data.imdbRating,
          id: response.data.imdbID,
          genres: response.data.Genre,
        };
        await Movie.insertMany(obj);
        res.send(obj);
      });
      console.log("Data inserted successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send(result);
  }
});

// getting the data using id
app.get("/id", async (req, res) => {
  try {
    const id = req.query.id;
    const result = await Movie.findOne({ id: id });
    if (result === null) {
      res.send({ message: "id is invalid" });
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

//getting the data based on year
app.get("/year", async (req, res) => {
  try {
    const year = req.query.year;
    const result = await Movie.find({ year: year });
    //res.send(result);
    if (result.length === 0) {
      res.send({ message: "not found" });
    } else {
      res.send(result);
    }
  } catch (err) {
    res.send(error);
  }
});

//getting the data based on rating
app.get("/rating", async (req, res) => {
  try {
    const rating = req.query.rating;
    const result = await Movie.find({
      $or: [{ rating: { $gt: rating } }, { rating: { $lt: rating } }],
    });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//getting the data based on genres
app.get("/genres", async (req, res) => {
  const result = req.query.genres;
  const data = await Movie.find({ genres: result });
  res.send(data);
});

app.listen("5000", console.log("server is running"));
