import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Header from "./Components/Headers";
const HomePage = lazy(() => import("./Pages/HomePage"));
const CoinsPage = lazy(() => import("./Pages/CoinsPage"));

const useStyles = makeStyles(() => ({
    App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
    },
}));
function App() {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading... </div>}>
                <div className={classes.App}>
                    <Header />
                    <Routes>
                        <Route path={"/"} element={<HomePage />} />
                        <Route path={"/coins/:id"} element={<CoinsPage />} />
                    </Routes>
                </div>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
