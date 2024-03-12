import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import PrimaryLayout from "../components/PrimaryLayout";

export default function Router() {
  console.log("there");
  return (
    <>
      <Routes>
        {routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              element={<PrimaryLayout Children={item.ele} />}
            />
          );
        })}
      </Routes>
    </>
  );
}