import { publish } from "gh-pages";

/**
 * The usage below will add a `CNAME` file to the output.
 */
publish("dist", { cname: "jakubkanna.com" }, (err) => {
  if (err) throw new Error(err);
  console.log("Published");
});
