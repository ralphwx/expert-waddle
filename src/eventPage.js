import { useMemo, useState } from "react";
import {events, event_types, organizers} from "./content.js";

function listIntersection(l1, l2) {
    let output = [];
    for(let e of l1) {
        if(l2.includes(e)) output.push(e);
    }
    return output;
}

export default function EventListingPage({events}) {
  const [selectedOrganizers, setSelectedOrganizers] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const types = event_types;

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const organizerMatch =
        selectedOrganizers.length === 0 ||
        listIntersection(selectedOrganizers, event.organizers).length > 0;

      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(event.type);

      const dateMatch = !selectedDate || event.date === selectedDate;

      return organizerMatch && typeMatch && dateMatch;
    });
  }, [selectedOrganizers, selectedTypes, selectedDate]);

  const toggleValue = (value, setList) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      <div className="flex gap-8">
        {/* Left Filter Panel */}
        <aside className="w-64 shrink-0 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Organizer</h2>
            {organizers.map((org) => (
              <label key={org} className="block">
                <input
                  type="checkbox"
                  checked={selectedOrganizers.includes(org)}
                  onChange={() => toggleValue(org, setSelectedOrganizers)}
                  className="mr-2"
                />
                {org}
              </label>
            ))}
            <div className="flex gap-2 text-sm mb-2">
              <button
                className="underline"
                onClick={() => setSelectedOrganizers(organizers)}
              >
                Select all
              </button>
              <button
                className="underline"
                onClick={() => setSelectedOrganizers([])}
              >
                Deselect all
              </button>
            </div>

          </div>

          <div>
            <h2 className="font-semibold mb-2">Event Type</h2>
            {types.map((type) => (
              <label key={type} className="block">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleValue(type, setSelectedTypes)}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
            <div className="flex gap-2 text-sm mb-2">
              <button
                className="underline"
                onClick={() => setSelectedTypes(types)}
              >
                Select all
              </button>
              <button
                className="underline"
                onClick={() => setSelectedTypes([])}
              >
                Deselect all
              </button>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Date</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </aside>

        {/* Event List */}
        <main className="flex-1 space-y-4">
          {filteredEvents.length === 0 && (
            <p className="text-gray-500">No events match your filters.</p>
          )}

          {filteredEvents.map((event, idx) => {
            console.log(event);
            console.log(event.organizers);
            console.log(event.links);
            return <div
              key={idx}
              className="border rounded-xl p-4 shadow-sm space-y-2"
            >
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-600">
                {event.organizers.join(", ")} • {event.type}
              </p>
              <p className="text-sm">
                {event.date} at {event.time} — {event.location}
              </p>
              <p>{event.description}</p>
              <p>References</p>
              {event.links.map((link) => {
                  return <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {link}
                  </a>
              })}
            </div>
          })}
        </main>
      </div>
    </div>
  );
}

