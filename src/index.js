import ReactDOM from "react-dom/client";
import EventListingPage from "./eventPage.js";
import "./index.css";

const events = [ 
  {             
    name: "AI Meetup",
    organizer: "Tech Group",
    date: "2026-03-10",
    time: "18:00",
    location: "New York",
    type: "Meetup",
    description: "A meetup about AI trends",
    link: "https://example.com/ai-meetup",
  },            
];     

function Main() {
    return <EventListingPage events={events} />
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
