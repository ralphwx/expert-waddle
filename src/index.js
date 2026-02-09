import ReactDOM from "react-dom/client";
import EventListingPage from "./eventPage.js";
import {events} from "./content.js";
import "./index.css";

function Main() {
    return <EventListingPage events={events} />
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
