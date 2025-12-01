const express = require("express");

const app = express();

app.use(express.json());

const PORT = 80;
const blogsDb = [];

app
  .route("/blog/:id")
  .get((req, res) => {
    try {
      if (req.params.id) {
        const blogId = req.params.id;
        const result = blogsDb.find({ id: blogId });
        if (result.length === 0) {
          const responseJson = {
            message: "Blog not found",
          };
          return res.json(responseJson);
        } else {
          const responseJson = {
            data: result,
            message: "Blog Found",
          };
          return res.json(responseJson);
        }
      }
    } catch (e) {
      const result = {
        message: `Error invalid id`,
      };
      return res.json(result);
    }
  })
  .patch((req, res) => {})
  .delete((req, res) => {});

app.get("/", (req, res) => {
  return res.json({ status: "healthy" });
});

app.get("/blogs", (req, res) => {
  return res.json(blogsDb);
});

app.post("/add", (req, res) => {
  try {
    if (req.body.title && req.body.content) {
      const lastIdx = blogsDb.length;
      const blog = {
        id: lastIdx + 1,
        title: req.body.title,
        content: req.body.content,
      };
      blogsDb.push(blog);

      const result = {
        data: blogsDb,
        message: `Successfully added new blog at index ${lastIdx + 1}`,
      };
      return res.json(result);
    } else {
      throw new Error("invalid schema");
    }
  } catch (e) {
    const result = {
      message: `Error while adding new blog`,
    };
    return res.json(result);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
